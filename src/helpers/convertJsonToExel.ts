import * as XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import {PermissionsAndroid} from "react-native";
import {getCurentTime, getFormattedTime} from "./getCurentTime.ts";



export const exportDataToExcel = (data: []|undefined) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(wb,ws,"response")
    const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});

    // Write generated excel to Storage
    RNFS.writeFile(RNFS.DownloadDirectoryPath+ `/ReportBullyResponse_${getFormattedTime(getCurentTime())}.xlsx`, wbout, 'ascii').then((r)=>{
        console.log('Success');
    }).catch((e)=>{
        console.log('Error', e);
    });

}



const permissions = [
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.CAMERA, // Tambahkan izin lain jika diperlukan
];

const checkPermissions = async () => {
    const results = {};
    for (const permission of permissions) {
        const result = await PermissionsAndroid.check(permission);
        results[permission] = result;
    }
    return results;
};