import firestore from '@react-native-firebase/firestore';
import {User} from "../Types";
import {validateUser} from "../helpers/validateUser.ts";
import auth from "@react-native-firebase/auth";
import {Logout} from "./auth.tsx";


/*
Get current user id
 */
export const getUserId = ()=>{
    const user = auth().currentUser;
    return user?.uid
}


/**
 * create new user
 * @param userPayload - The ID of the report
 * @param id - id user
 * @returns Success or failure status
 */
export const createUser = async (userPayload: User, id: string) => {
    try {
        // check validasi user
        const {success, data} = validateUser(userPayload)

        // jika gagal throw error
        if (!success){
            throw new Error('Data yang anda masukkan tidak valid');
        }

        if (data?.email.includes('@guru')){
            data.role = 'guru'
        }

        // buat collection baru ke firestore
        await firestore().collection('users').doc(id).set(data!);
        console.info('User added!');
        return { success: true, message: 'User added successfully' };
    } catch (error: any) {
        console.error( error,'<< adding user');
        return { success: false, message: error.message };
    }
};


/**
 * Get User by Id
 * @param userId - The ID of the user
 * @returns Success or failure status
 */
export const getUser = async (userId: string | undefined) => {
    try {
        // ambil data user dari firestore
        const userDocument = await firestore().collection('users').doc(userId).get();
        if (!userDocument.exists) {
            throw new Error('User does not exist!');
        }
        console.info('user berhasil di cari')
        return { success: true, data: userDocument.data() as User};
    } catch (error: any) {
        console.error(error, '<< get data user');
        return { success: false, message: error.message };
    }
};

/**
 * Update an existing bullying report
 * @param userId - The ID of user
 * @param updatePayloadUser - The updated bullying response data
 * @returns Success or failure status
 */
export const updateUser = async (userId: string, updatePayloadUser: Partial<User>) => {
    try {
        // update data user
        await firestore().collection('users').doc(userId).update(updatePayloadUser);
        console.info('data user berhasil di updated', updatePayloadUser);
        return { success: true, message: 'User updated successfully' };
    } catch (error: any) {
        console.error(error, '<< Update data user');
        return { success: false, message: error.message };
    }
};

/**
 * Delete  user
 * @param userId - The ID of the report
 * @param password - password
 * @returns Success or failure status
 */
export const deleteUser = async (userId: string, password:string) => {
    try {
        // hapus juga data user di  auth
        const user = auth().currentUser;
        const credential = auth.EmailAuthProvider.credential(
            user!.email!,
           password
        );
        // lakukan reauthentikasi
        await user!.reauthenticateWithCredential(credential);
        await user!.delete();
        // delete data user
        await firestore().collection('users').doc(userId).delete();
        await Logout()
        console.info('user berhasil dihapus');
        return { success: true, message: 'User deleted successfully' };
    } catch (error: any) {
        console.error(error, '<< delete data user');
        return { success: false, message: error.message };
    }
};
