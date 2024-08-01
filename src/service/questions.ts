import firestore from '@react-native-firebase/firestore';
import {Questions} from "../Types/Questions.ts";

// Fungsi untuk menambahkan pertanyaan

// BERIAKN RETURN YANG PASTI
export const addQuestion = async (question: Questions) => {
    try {
        await firestore().collection('questions').doc(question.id).set(question);
        console.info('Question added!');
    } catch (error) {
        console.error('Error adding question: ', error);
    }
};


// Fungsi untuk mengambil semua pertanyaan berdasarkan tipe
export const getQuestionsByType = async (type: 'physical' | 'verbal' | 'seksual' | 'cyber') => {
    try {
        const snapshot = await firestore().collection('questions').where('type', '==', type).get();
        if (snapshot.empty) {
            console.log('No questions found!');
            return [];
        }
        return snapshot.docs.map(doc => doc.data() as Questions);
    } catch (error) {
        console.error('Error getting questions: ', error);
        return [];
    }
};


// Fungsi untuk mengupdate pertanyaan berdasarkan ID
export const updateQuestion = async (id: string, updatedQuestion: Partial<Questions>) => {
    try {
        await firestore().collection('questions').doc(id).update(updatedQuestion);
        console.log('Question updated!');
    } catch (error) {
        console.error('Error updating question: ', error);
    }
};


// Fungsi untuk menghapus pertanyaan berdasarkan ID
export const deleteQuestion = async (id: string) => {
    try {
        await firestore().collection('questions').doc(id).delete();
        console.log('Question deleted!');
    } catch (error) {
        console.error('Error deleting question: ', error);
    }
};


