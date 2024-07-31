import firestore, {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";


export function getCurentTime() {return firestore.Timestamp.now()}

export function getFormattedTime(timestamp: FirebaseFirestoreTypes.Timestamp): string {
    const date = timestamp.toDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return (`${year}-${month}-${day}`);
}