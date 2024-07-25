import auth from '@react-native-firebase/auth';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export async function checkIfUserIsLoggedIn(): Promise<{ loggedIn: boolean; user: FirebaseAuthTypes.User | null }> {
    const user = auth().currentUser;
    if (user) {
        return {
            loggedIn: true,
            user,
        };
    } else {
        return {
            loggedIn: false,
            user: null,
        };
    }
}
