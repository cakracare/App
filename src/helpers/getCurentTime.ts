import firestore, {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";


export function getCurentTime() {return firestore.Timestamp.now()}

export function getFormattedTime(timestamp: FirebaseFirestoreTypes.Timestamp): string {
    try {
        const date = timestamp.toDate();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return (`${year}-${month}-${day}`);
    }catch (err){
        console.error('eror');
        return ''
    }
}