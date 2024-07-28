import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {GoogleSignin, isErrorWithCode} from "@react-native-google-signin/google-signin";
import {User, UserSchema} from '../Types'
import {createUser, getUser} from "./user.ts";
import {handleFirebaseError} from "../helpers/handlingErrorFirebase.ts";



// Configuration : google
GoogleSignin.configure({
    webClientId: '448143761674-rt1fffn31i4ggojp6j20fgus1g9rt3i4.apps.googleusercontent.com',
})

export const signInWithEmailAndPass = async (email: string, password: string) => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const user = await getUser(userCredential.user.uid);

        return {
            success: true,
            user: user.data,
            message: 'Login successful'
        };
    } catch (error: any) {
        const message = handleFirebaseError(error)
        return {
            success: false,
            message: message
        };
    }
};



export async function SignUpWithEmailAndPassword(user:User, password:string,confirm_password:string) {
    try {
        // Validasi password
        if (password !== confirm_password) {
            return { success: false, data: null, message: 'Password tidak sama' };
        }

        const userCredential = await auth().createUserWithEmailAndPassword(user.email,password);

        if (userCredential.user) {
            await userCredential.user.updateProfile({
                displayName: user.nama_lengkap,
                photoURL: user.photoURL
            });

           return await  createUser(user,userCredential.user.uid)
        } else {
            return {
                success: false,
                message: 'Pengguna tidak ditemukan setelah pendaftaran.'
            };
        }
    } catch (error: any) {
        console.log('error', error.code);

        // Penanganan kesalahan
        let message = 'Terjadi kesalahan. Silakan coba lagi.';
        switch (error.code) {
            case 'auth/email-already-in-use':
                message = 'Email sudah digunakan.';
                break;
            case 'auth/invalid-email':
                message = 'Email tidak valid.';
                break;
            case 'auth/operation-not-allowed':
                message = 'Operasi tidak diizinkan.';
                break;
            case 'auth/weak-password':
                message = 'Password terlalu lemah.';
                break;
        }

        return {
            success: false,
            data: null,
            message
        };
    }
}

export const signInWithGoogle = async () => {
    try {
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const userCredential = await auth().signInWithCredential(googleCredential);
        const user = userCredential.user;
        const userDoc = await firestore().collection('users').doc(user.uid).get();

        if (!userDoc.exists) {
                const datauser: User = UserSchema.parse({nama_lengkap : user.displayName,
                    email : user.email,
                    photoURL : user.photoURL})
                await createUser(datauser,user.uid)
                return {
                    success: true,
                    user: datauser,
                    message: 'Login successful with Google!'
                };
        }

        return {
            success: true,
            user: userDoc.data(),
            message: 'Login successful with Google!'
        };
    } catch (error: any) {
        if (isErrorWithCode(error)) {
            console.log(error.code)
        }
        return {
            success: false,
            message: error.message
        };
    }
};

// Fungsi untuk Logout
export async function Logout() {
    try {
        await auth().signOut();
        return {
            success: true,
            message: 'Logout berhasil.'
        };
    } catch (error: any) {
        console.error(error)
        return {
            success: false,
            message: error.message
        };
    }
}
