import React, {useCallback, useEffect, useState} from 'react';
import {Button, Card, Icon, Layout, List, Text} from '@ui-kitten/components';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import ButtonCompo from '../../components/ButtonCompo';
import {Alert, View} from 'react-native';
import CardComp from '../../components/CardComp';
import {getUser, getUserId} from '../../service/user.ts';
import {fetchUsersWithReports, getReportsByUser} from '../../service/report.ts';
import {timeAgo} from '../../helpers/timeAgo.ts';
import {Report} from '../../Types';
import {useUser} from '../../helpers/userContext.tsx';
import {exportDataToExcel} from '../../helpers/convertJsonToExel.ts';

const ReportScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const userId = getUserId() || '';
  const {user, setUser} = useUser();

  const [reports, setReports] = useState<any>({});

  useFocusEffect(
    React.useCallback(() => {
      const fetchReports = async () => {
        try {
          const reportData = await getReportsByUser(userId, user?.role);
          setReports(reportData.data);
        } catch (error) {
          console.error('Error fetching reports:', error);
        }
      };

      fetchReports();

      return () => {
        // Cleanup if necessary
      };
    }, [userId]),
  );

  /*
    result laporan = [
        {
        "nama pelapor" : 'sdfsdf',
        "kelas" : '',
        "alamat" : '',
        "tgl laporan" '',
        "verbal" : 0,
        "fisik" : 0,
        "seksual" : 0,
        "cyber" : 0,
        "skor total" : 0,
        "kategori" : 0,
        "feedback" : 0,
    }
    ]
     */

  // const userreport = getUser(reports[3]?.userId).then((user)=>{
  //     console.log(reports[2], user?.data?.nama_lengkap, user?.data?.alamat_lengkap, user?.data?.kelas)
  // });

  // const data = {
  //     nama_lengkap: 'John Doe',
  //     email: 'johndoe@example.com',
  //     usia: 17,
  //     role: 'Student',
  //     kelas: '12A',
  //     asal_sekolah: 'SMA 1',
  //     no_ortu: '081234567890',
  //     alamat_lengkap: 'Jl. Merdeka No. 123',
  //     gender: 'Male'
  // };

  const data = useCallback(async () => {
    const allReportUser = await fetchUsersWithReports(user?.role!);
    const isDownloaded = await exportDataToExcel(allReportUser);
    if (isDownloaded) {
      Alert.alert('Suskes');
    }
  }, []);

  if (!user?.alamat_lengkap) {
    Alert.alert(
      'Invalid data',
      'data tidak lengkap, silahkah dilengkapi terlbih dahulu',
    );
  }

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
        {user?.role === 'siswa' ? (
          <ButtonCompo
            width={300}
            disabled={!user?.alamat_lengkap}
            text="Report"
            status="primary"
            onPress={() => {
              // lakukan pengecekan apakah data user sudah lengkap
              navigation.navigate('ReportNavigator', {screen: 'ReportDetail'});
            }}
          />
        ) : (
          <Button onPress={data}>Download response laporan</Button>
        )}
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
      {reports?.length > 0 ? (
        reports.map((report: Report, index: number) => (
          <CardComp
            key={index}
            onPress={() =>
              navigation.navigate('HasilReport', {idreport: report.id})
            }
            time={timeAgo(report?.timestamp!)}
            status="danger"
            title={report.title}
            text={report.status}
          />
        ))
      ) : (
        <Text>No reports found</Text>
      )}
    </Layout>
  );
};

export default ReportScreen;
