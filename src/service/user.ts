import firestore from '@react-native-firebase/firestore';
import {User} from "../Types";
import {validateUser} from "../helpers/validateUser.ts";
import auth from "@react-native-firebase/auth";


/*
Get current user id
 */
export const getUserId = ()=>{
    const user = auth().currentUser;
    return user?.uid
}

// LAKUKAN PENGECEKAN APAKAH USER ADA ATAU TIDAK KETIKA MELAKUKAN OPERASI
// GET, UPDATE DAN DELETE USER. DAN PASTIKAN SEMUA DATABASE YANG TERHUBUNG KE USER TERHAPUS

// Buat user baru
export const createUser = async (user: User, id: string) => {
    try {
        // check validasi user
        const {success, data} = validateUser(user)

        // jika gagal throw error
        if (!success){
            throw new Error('Data yang anda masukkan tidak valid');
        }
        // @ts-ignore
        // buat collection baru ke firestore
        await firestore().collection('users').doc(id).set(data);
        console.info('User added!');
        return { success: true, message: 'User added successfully' };
    } catch (error: any) {
        console.error( error,'<< adding user');
        return { success: false, message: error.message };
    }
};


// Get a user by UID
export const getUser = async (uid: string | undefined) => {
    try {
        // ambil data user dari firestore
        const userDocument = await firestore().collection('users').doc(uid).get();
        if (!userDocument.exists) {
            throw new Error('User does not exist!');
        }
        console.info('user berhasil ditambahkan')
        return { success: true, data: userDocument.data() as User};
    } catch (error) {
        console.error(error, '<< get data user');
        // @ts-ignore
        return { success: false, message: error.message };
    }
};

// Update a user by UID
export const updateUser = async (uid: string, updatedData: Partial<User>) => {
    try {
        // check apakah user ada atau tidak

        // update data user
        await firestore().collection('users').doc(uid).update(updatedData);
        console.info('data user berhasil di updated');
        return { success: true, message: 'User updated successfully' };
    } catch (error) {
        console.error(error, '<< Update data user');
        // @ts-ignore
        return { success: false, message: error.message };
    }
};

// Delete a user by UID
export const deleteUser = async (uid: string) => {
    try {
        // hapus juga data user di  auth
        // delete data user
        await firestore().collection('users').doc(uid).delete();
        console.info('user berhasil dihapus');
        return { success: true, message: 'User deleted successfully' };
    } catch (error) {
        console.error(error, '<< delete data user');
        // @ts-ignore
        return { success: false, message: error.message };
    }
};
