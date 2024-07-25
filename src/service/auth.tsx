import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { checkIfUserIsLoggedIn } from "../helpers/checkIfUserIsLoggedIn.ts";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {User}from'../Types'
import {createUser} from "./user.ts";

// Configuration : google
GoogleSignin.configure({
    webClientId: '448143761674-rt1fffn31i4ggojp6j20fgus1g9rt3i4.apps.googleusercontent.com',
})

export const signInWithEmailAndPass = async (email: string, password: string) => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        return {
            success: true,
            userid: user.uid || null,
            message: 'Login successful'
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        };
    }
};



export async function SignUpWithEmailAndPassword(user:User, confirm_password:string) {
    try {
        // Validasi password
        if (user.password !== confirm_password) {
            return { success: false, data: null, message: 'Password tidak sama' };
        }
        // Pendaftaran pengguna
        const userCredential = await auth().createUserWithEmailAndPassword(user.email, user.password);

        if (userCredential.user) {
            await userCredential.user.updateProfile({
                displayName: user.displayName || "",
                photoURL: user.photoURL || ""
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
        // Google Sign-In
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const userCredential = await auth().signInWithCredential(googleCredential);
        const user = userCredential.user;
        const userDoc = await firestore().collection('users').doc(user.uid).get();

        if (!userDoc.exists) {
            await firestore().collection('users').doc(user.uid).set({
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                // Tambahkan field lain yang diperlukan
            });
        }

        return {
            success: true,
            userid: user.uid || null,
            message: 'Login successful with Google!'
        };
    } catch (error: any) {
        console.log(error)
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
        console.log(error);
        return {
            success: false,
            message: 'Logout gagal. Silakan coba lagi.'
        };
    }
}
