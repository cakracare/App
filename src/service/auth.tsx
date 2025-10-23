import auth from "@react-native-firebase/auth";
import firestore, {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {User, UserSchema} from '../Types'
import {createUser, getUser} from "./user.ts";
import {handleFirebaseError} from "../helpers/handlingErrorFirebaseAuth.ts";


// Configuration : google
GoogleSignin.configure({
    webClientId: '448143761674-rt1fffn31i4ggojp6j20fgus1g9rt3i4.apps.googleusercontent.com',
})

/**
 * Register new user
 * @param user - payload user
 * @param password - password user
 * @param confirm_password - password Confirm
 * @returns Success or failure status
 */
export async function SignUpWithEmailAndPassword(user:User, password:string,confirm_password:string) {
    try {
        // Validasi password
        if (password !== confirm_password) {
            return { success: false, data: null, message: 'Password tidak sama' };
        }

        // Check apakah user bisa daftar sebagai guru atau tidak

        // daftarkan email dan password yang sudah dicek ke firebase auth
        const userCredential = await auth().createUserWithEmailAndPassword(user.email,password);
        console.log(userCredential, '<< signup email password')

        // jika user gagal dibuat maka retur gagal
        if (!userCredential.user) {
            return {
                success: false,
                message: 'User gagal dibuat, pastikan semua data yang anda masukkan benar'
            };
        }

        // jika berhadil dibuat update data user credensial sesuai dengan data yang didapatkan dari register
        await userCredential.user.updateProfile({
            displayName: user.nama_lengkap,
            photoURL: user.photoURL
        });

        //  send auth message

        // uploud data user ke firestore
        const newUser = await  createUser(user,userCredential.user.uid)
        if (!newUser.success){
            return {
                success: false,
                message: newUser.message,
            }
        }
        await auth().signOut();

        return {
            success: true,
            message: 'User berhasil dibuat!'
        }

    } catch (error: any) {
        // kirim pesan ketika terjadi error
        console.error(error, '<< regisrter user')
        const message = handleFirebaseError(error)
        return {
            success: false,
            message: message || 'Terjadi kesalahan ketika membuat akun, silakan coba lagi'
        };
    }
}


/**
 * Sign in with email & password
 * @param email  - email user
 * @param password - password user
 * @returns Success or failure status & data user
 */
export const signInWithEmailAndPass = async (email: string, password: string) => {
    try {
        // login with password & email
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        console.info(userCredential, '<< login with email password');

        // lakukan pengecekan apakah email berhasil login atau tidak
        if(!userCredential){
            return {
                success: false,
                message: 'User Not Found'
            }
        }

        //ambil data user dari firestore
        const user = await getUser(userCredential.user.uid);


        // kirim pesan ketika login berhasil
        return {
            success: true,
            user: user.data,
            message: 'Login successful'
        };
    } catch (error: any) {
        // pesan ketika terjadi error
        console.error(error)
        const message = handleFirebaseError(error)
        return {
            success: false,
            message: message
        };
    }
};


/**
 * Login with Gmail
 * @returns Success or failure status
 */
const MAX_RETRIES = 5;

export const signInWithGoogle = async (attempt = 1): Promise<{ success: boolean, user?: User, message: string }> => {
    try {
        // Ambil token dari device
        const { idToken } = await GoogleSignin.signIn();
        // Ambil data dari Google credential menggunakan token yang sudah didapatkan
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Login menggunakan credential yang sudah didapat
        const userCredential = await auth().signInWithCredential(googleCredential);
        // Ambil data user
        const user = userCredential.user;
        // Ambil data user dari Firestore
        const userDoc = await fetchUserDocWithRetry(user.uid);
        console.info(userDoc.exists, 'login with gmail');

        // Jika belum ada user akan register ulang
        if (!userDoc.exists) {
            const datauser: User = UserSchema.parse({
                nama_lengkap: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            });
            await createUser(datauser, user.uid);
            console.info('<< sukses create user');
            return {
                success: true,
                user: datauser as User,
                message: 'Register successful with Google!'
            };
        }

        // Jika user sudah ada maka kirim pesan sukses
        return {
            success: true,
            user: userDoc.data() as User,
            message: 'Login successful with Google!'
        };
    } catch (error: any) {
        console.error(error);
        if (error.code === 'auth/network-request-failed' && attempt <= MAX_RETRIES) {
            const delay = Math.pow(2, attempt) * 100; // Backoff eksponensial
            console.log(`Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return signInWithGoogle(attempt + 1);
        } else {
            await auth().signOut();
            const message = handleFirebaseError(error);
            console.error(message, '<< auth with google');
            return {
                success: false,
                message: message || error.message
            };
        }
    }
};

const fetchUserDocWithRetry = async (uid: string, attempt = 1): Promise<FirebaseFirestoreTypes.DocumentSnapshot> => {
    try {
        return await firestore().collection('users').doc(uid).get();
    } catch (error: any) {
        if (error.code === 'unavailable' && attempt <= MAX_RETRIES) {
            const delay = Math.pow(2, attempt) * 100; // Backoff eksponensial
            console.log(`Retrying to fetch user doc in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchUserDocWithRetry(uid, attempt + 1);
        } else {
            throw error;
        }
    }
};

// Fungsi untuk Logout
export async function Logout() {
    try {
        // logout, cek apakah user menggunakan user biasa atau gmail
        await GoogleSignin.signOut() || await auth().signOut();
        console.info('Berhasil logout')
        return {
            success: true,
            message: 'Logout berhasil.'
        };
    } catch (error: any) {
        console.error(error)
        const message = handleFirebaseError(error)
        console.error(message, '<< logout')
        return {
            success: false,
            message: error.message
        };
    }
}

export const sendPasswordResetEmail = async (email: string): Promise<{ success: boolean, message: string }> => {
    try {
        // Cek apakah email terdaftar
        const userSnapshot = await firestore().collection('users').where('email', '==', email).get();

        if (!userSnapshot.empty) {
            // Jika email terdaftar, kirim email reset password
            await auth().sendPasswordResetEmail(email);
            return { success: true, message: 'Email reset password telah dikirim!' };
        } else {
            // Jika email tidak terdaftar
            return { success: false, message: 'Email tidak terdaftar.' };
        }
    } catch (error: any) {
        console.error('Error sending password reset email:', error);
        return { success: false, message: 'Gagal mengirim email reset password.' };
    }
};
