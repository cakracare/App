import * as XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import {PermissionsAndroid} from 'react-native';
import {getCurentTime, getFormattedTime} from './getCurentTime.ts';
import {Platform} from 'react-native';


export const exportDataToExcel = async (data: [] | undefined) => {
  const hasPermission = await checkPermissions();
  const version = Platform.Version;

  if (Number(version) < 33) {
    if (!hasPermission) {
      console.log('Permission denied');
      const permissionGranted = await requestExternalWritePermission();
      if (!permissionGranted) {
        console.log('Permission denied, cannot proceed with export');
        return {status:false,path:null};
      }
    }
  }

  let wb = XLSX.utils.book_new();
  let ws = XLSX.utils.json_to_sheet(data!);
  XLSX.utils.book_append_sheet(wb, ws, 'response');
  const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });

  try {
    // Menyimpan file ke Download atau Document Directory
    const path = `${RNFS.DownloadDirectoryPath}/ReportBullyResponse_${getFormattedTime(getCurentTime())}.xlsx`;

    await RNFS.writeFile(path, wbout, 'ascii');
    console.log('File saved successfully at', path);
    return {status: true, path: path};
  } catch (e) {
    console.log('Error writing file', e);
    Alert.alert('Error', 'Failed to save the file.');
    return {status:false,path:null};
  }
};
const permissions = [
  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
];

const checkPermissions = async () => {
  for (const permission of permissions) {
    const result = await PermissionsAndroid.check(permission);
    if (!result) {
      return false;
    }
  }
  return true;
};

const requestExternalWritePermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(permissions);
    if (
      granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('You can use the storage');
      return true;
    } else {
      console.log('Storage permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};
