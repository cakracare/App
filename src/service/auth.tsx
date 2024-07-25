import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { checkIfUserIsLoggedIn } from "../helpers/checkIfUserIsLoggedIn";
import {GoogleSignin} from "@react-native-google-signin/google-signin";



// Configuration : google
GoogleSignin.configure({
    webClientId: '448143761674-rt1fffn31i4ggojp6j20fgus1g9rt3i4.apps.googleusercontent.com',
})

// ====================================================================================================================
// Fungsi untuk Sign In dengan Email dan Password
export async function SignInWithEmailAndPassword(email: string, password: string) {
    try {
        const isLogin = await checkIfUserIsLoggedIn()
        if (isLogin.loggedIn) return { success: false, data: isLogin.user, message: 'user sudah login' }

        if ((email == '') || (password == '')) return { success: false, data: isLogin.user, message: 'Username or password kosogn' }
        const user = await auth().signInWithEmailAndPassword(email, password);
        return {
            success: true,
            data: user,
            message: 'SUKSES'
        };
    } catch (error: any) {
        console.log(error)
        let message = 'FAILED';
        switch (error.code) {
            case 'auth/invalid-email':
                message = 'Email tidak valid.';
                break;
            case 'auth/user-disabled':
                message = 'Pengguna telah dinonaktifkan.';
                break;
            case 'auth/user-not-found':
                message = 'Pengguna tidak ditemukan.';
                break;
            case 'auth/too-many-requests':
                message = 'Terlalu banyak permintaan. Silakan coba lagi nanti.';
                break;
            default:
                message = 'Terjadi kesalahan. Silakan coba lagi.';
                break;
        }

        return {
            success: false,
            data: null,
            message
        };
    }
}

// Fungsi untuk Sign Up dengan Email, Password, dan data tambahan
export async function SignUpWithEmailAndPassword(email: string, password: string, confirm_password: string, additionalData: { [key: string]: any }) {
    try {
        if (password !== confirm_password) return { success: false, data: null, message: 'Password tidak sama' };
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);

        if (userCredential.user) {
            await userCredential.user.updateProfile({
                displayName: additionalData.displayName || "",
                photoURL: additionalData.photoURL || ""
            });

            // Menyimpan data tambahan lainnya di Firestore
            await firestore().collection('users').doc(userCredential.user.uid).set(additionalData);
            await auth().signOut();
            return {
                success: true,
                data: userCredential.user,
                message: 'SUKSES'
            };
        } else {
            return {
                success: false,
                data: null,
                message: 'User tidak ditemukan setelah pendaftaran.'
            };
        }
    } catch (error: any) {
        console.log('error', error.code);

        let message = 'FAILED';
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
            default:
                message = 'Terjadi kesalahan. Silakan coba lagi.';
                break;
        }

        return {
            success: false,
            data: null,
            message
        };
    }
}

export async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
}

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
