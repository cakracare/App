import firestore from '@react-native-firebase/firestore';
import {User} from "../Types";
import {validateUser} from "../helpers/validateUser.ts";

// Create a new user
export const createUser = async (user: User, id: string) => {
    try {
        const {success, data} = validateUser(user)
        // @ts-ignore
        await firestore().collection('users').doc(id).set(data);
        console.log('User added!');
        return { success: true, message: 'User added successfully' };
    } catch (error) {
        console.error('Error adding user: ', error);
        // @ts-ignore
        return { success: false, message: error.message };
    }
};

// Get a user by UID
export const getUser = async (uid: string) => {
    try {
        const userDocument = await firestore().collection('users').doc(uid).get();
        if (userDocument.exists) {
            console.log('User data:', userDocument.data());
            return { success: true, data: userDocument.data() };
        } else {
            return { success: false, message: 'User not found' };
        }
    } catch (error) {
        console.error('Error getting user: ', error);
        // @ts-ignore
        return { success: false, message: error.message };
    }
};

// Update a user by UID
export const updateUser = async (uid: string, updatedData: Partial<User>) => {
    try {
        await firestore().collection('users').doc(uid).update(updatedData);
        console.log('User updated!');
        return { success: true, message: 'User updated successfully' };
    } catch (error) {
        console.error('Error updating user: ', error);
        // @ts-ignore
        return { success: false, message: error.message };
    }
};

// Delete a user by UID
export const deleteUser = async (uid: string) => {
    try {
        await firestore().collection('users').doc(uid).delete();
        console.log('User deleted!');
        return { success: true, message: 'User deleted successfully' };
    } catch (error) {
        console.error('Error deleting user: ', error);
        // @ts-ignore
        return { success: false, message: error.message };
    }
};
