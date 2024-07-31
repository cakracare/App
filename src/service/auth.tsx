import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {User, UserSchema} from '../Types'
import {createUser, getUser} from "./user.ts";
import {handleFirebaseError} from "../helpers/handlingErrorFirebaseAuth.ts";



// Configuration : google
GoogleSignin.configure({
    webClientId: '448143761674-rt1fffn31i4ggojp6j20fgus1g9rt3i4.apps.googleusercontent.com',
})


/*
Login with email & password
 */
export const signInWithEmailAndPass = async (email: string, password: string) => {
    try {
        // login with password & email
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        console.info(userCredential, '<< login with email password');

        // lakukan pengecekan apakah email berhasil login atau tidak

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



/*
sign up with email & password
butuh sedikit optomasi di bagian pengecekan
 */
export async function SignUpWithEmailAndPassword(user:User, password:string,confirm_password:string) {
    try {
        // Validasi password
        if (password !== confirm_password) {
            return { success: false, data: null, message: 'Password tidak sama' };
        }

        // check apakah user terdaftaar autau belum

        // daftarkan email dan password yang sudah dicek ke firebase auth
        const userCredential = await auth().createUserWithEmailAndPassword(user.email,password);
        console.log(userCredential, '<< signup email password')

        // check apakah user credensial ada atau tidak
        if (userCredential.user) {
            // jika ada update data user credensia sesuai dengan data yang didapatkan dari register
            await userCredential.user.updateProfile({
                displayName: user.nama_lengkap,
                photoURL: user.photoURL
            });
           //  send auth message

           // uploud data user ke firestore
           return await  createUser(user,userCredential.user.uid)
        }

    } catch (error: any) {
        // kirim pesan ketika terjadi error
        console.error(error, '<< regisrter user')
        const message = handleFirebaseError(error)
        return {
            success: false,
            message: message
        };
    }
}


/*
Login with gmail
 */
export const signInWithGoogle = async () => {
    try {
        // ambil token dari device
        const { idToken } = await GoogleSignin.signIn();
        // ambil data dari google credensial mengguakan token yagn sudah didapatkan
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // login menggunakan credensial yang sudha didapat
        const userCredential = await auth().signInWithCredential(googleCredential);
        // ambil data user
        const user = userCredential.user;
        // check apakah user sudha terdaftar atau belum, jika belum maka harus registrasi terlebih dahulu
        //ambil data user dari firestore
        const userDoc = await firestore().collection('users').doc(user.uid).get();
        console.info(userDoc.exists, 'login with gmail')

        // jika belum ada user akan register ulang
        if (!userDoc.exists) {
            try {
                const datauser: User = UserSchema.parse({
                    nama_lengkap : user.displayName,
                    email : user.email,
                    photoURL : user.photoURL})
                await createUser(datauser, user.uid);
                console.log('<< sukses create user')
                return {
                    success: true,
                    user: datauser as User,
                    message: 'Login successful with Google!'
                };
            } catch (createUserError: any) {
                console.log(createUserError, '<< create user eror')
                await auth().signOut();
                return {
                    success: false,
                    message: `Failed to create user: ${createUserError.message}`
                };
            }
        }

        // jika user sudah ada maka kirim pesan sukses
        return {
            success: true,
            user: userDoc.data() as User,
            message: 'Login successful with Google!'
        };
    } catch (error: any) {
        const message = handleFirebaseError(error)
        console.error(message, '<< auth with google')
        return {
            success: false,
            message: error.message
        };
    }
};

// Fungsi untuk Logout
export async function Logout() {
    try {

        // logout, cek apakah user menggunakan user biasa atau gmail
        await GoogleSignin.signOut() || await auth().signOut();
        return {
            success: true,
            message: 'Logout berhasil.'
        };
    } catch (error: any) {
        const message = handleFirebaseError(error)
        console.error(message, '<< logout')
        return {
            success: false,
            message: error.message
        };
    }
}
