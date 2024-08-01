import React, {useCallback, useEffect, useState} from 'react';
import {Button, Card, Icon, Layout, List, Text} from '@ui-kitten/components';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import ButtonCompo from '../../components/ButtonCompo';
import {PermissionsAndroid, View} from 'react-native';
import CardComp from '../../components/CardComp';
import {getUserId} from "../../service/user.ts";
import {getReportsByUser} from "../../service/report.ts";
import {timeAgo} from "../../helpers/timeAgo.ts";
import {Report} from "../../Types";
import {useUser} from "../../helpers/userContext.tsx";
import * as XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import {getCurentTime, getFormattedTime} from "../../helpers/getCurentTime.ts";


const ReportScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const userId =  getUserId() || ''
  const {user,setUser} = useUser()

    const [reports, setReports] = useState<any>({});

    useFocusEffect(
        React.useCallback(() => {
            const fetchReports = async () => {
                try {
                    const reportData = await getReportsByUser(userId, user?.role);
                    setReports(reportData);
                } catch (error) {
                    console.error('Error fetching reports:', error);
                }
            };

            fetchReports();

            return () => {
                // Cleanup if necessary
            };
        }, [userId])
    );


    const exportDataToExcel = () => {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(reports?.reports)
        XLSX.utils.book_append_sheet(wb,ws,"Users")
        const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});

        // Write generated excel to Storage
        RNFS.writeFile(RNFS.DownloadDirectoryPath+ `/ReportBullyResponse_${getFormattedTime(getCurentTime())}.xlsx`, wbout, 'ascii').then((r)=>{
            console.log('Success');
        }).catch((e)=>{
            console.log('Error', e);
        });

    }
    const handleClick = async () => {

        try{
            // Check for Permission (check if permission is already given or not)
            let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            let isPermitedReadStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

            if(!isPermitedExternalStorage){

                // Ask for permission
                const granted = await PermissionsAndroid.requestMultiple([
                        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                ])


                if (
                    granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
                    granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
                ) {
                    // Permission Granted (calling our exportDataToExcel function)
                    exportDataToExcel();
                    console.log("Permission granted");
                } else {
                    // Permission denied
                    console.log("Permission denied");
                }
            }else{
                // Already have Permission (calling our exportDataToExcel function)
                exportDataToExcel();
            }
        }catch(e){
            console.log('Error while checking permission');
            console.log(e);
            return
        }

    };

  return (
    <Layout
      style={{
        flex: 1,
        padding: 10,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        <ButtonCompo
          text="Report"
          status="primary"
          onPress={() => {
            navigation.navigate('ReportNavigator', {screen: "ReportDetail"});
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginStart: 5,
          marginVertical: 10,
        }}>
        Result Report
      </Text>
        {reports?.reports?.length > 0 ? (
            reports?.reports.map((report: Report, index: number) => (
                <CardComp
                    key={index}
                    onPress={() => console.log('Report pressed')}
                    time={timeAgo(report?.timestamp)}
                    status="warning"
                    title={reports.id}
                    text="Success"
                />
            ))
        ) : (
            <Text>No reports found</Text>
        )}

        <Button onPress={handleClick}>sdfdsf</Button>
    </Layout>
  );
};

export default ReportScreen;
