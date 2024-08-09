import React, {useCallback,useState} from 'react';
import {
  Icon,
  Layout,
  Modal,
  Spinner,
  Text,
} from '@ui-kitten/components';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {
    Alert, ScrollView,
    ToastAndroid,
    TouchableOpacity,
} from 'react-native';
import CardComp from '../../components/CardComp';
import {fetchUsersWithReports, getReportsByUser,getUserId} from '../../service';
import {timeAgo} from '../../helpers/timeAgo.ts';
import {Report} from '../../Types';
import {useUser} from '../../helpers/userContext.tsx';
import {exportDataToExcel} from '../../helpers/convertJsonToExel.ts';

const ReportScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const userId = getUserId() || '';
  const {user, setUser} = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const [reports, setReports] = useState<any>({});

  useFocusEffect(
    React.useCallback(() => {
      const fetchReports = async () => {
        try {
          const reportData = await getReportsByUser(userId, user!.role);
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

  const data = useCallback(async () => {
    try {
      setIsLoading(true);
      const allReportUser = await fetchUsersWithReports(user?.role!);
      console.log(allReportUser.length);
      const isDownloaded = await exportDataToExcel(allReportUser);

      if(!isDownloaded.status){
          throw new Error('Gagal Simpan file')
      }
      if (isDownloaded.status) {
        ToastAndroid.show( `File saved to ${isDownloaded.path}`, ToastAndroid.SHORT);
        setIsLoading(false);
      }

    } catch (e) {
      setIsLoading(false)
      ToastAndroid.show(e!.message, ToastAndroid.SHORT);
      console.log(e);
    }
  }, []);

  if (!user?.alamat_lengkap) {
    Alert.alert(
      'Invalid data',
      'data tidak lengkap, silahkah dilengkapi terlebih dahulu',
    );
  }

  return (
    <Layout
      style={{
        flex: 1,
        padding: 10,
      }}>
      <Modal
        visible={isLoading}
        animationType="fade"
        backdropStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <Spinner size="giant" status="primary" />
      </Modal>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginStart: 5,
          marginVertical: 10,
        }}>
        Result Report
      </Text>
        <ScrollView>
      {reports?.length > 0 ? (
        reports.map((report: Report, index: number) => (
          <CardComp
            key={index}
            onPress={() =>
              navigation.navigate('HasilReport', {idreport: report.id})
            }
            time={timeAgo(report?.timestamp!)}
            status={report.status === 'success' ? '#06D001' : 'orange'}
            title={report.title}
            text={report.status === 'success' ? 'tertangani' : report.status}
          />
        ))
      ) : (
        <Text>No reports found</Text>
      )}
        </ScrollView>
      {user?.role === 'siswa' ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ReportNavigator', {screen: 'ReportDetail'});
          }}
          style={{
            position: 'absolute',
            right: 10,
            bottom: 10,
            backgroundColor: '#439BFF',
            borderRadius: 10,
            padding: 10,
            width: 50,
            height: 50,
          }}>
          <Icon
            name="plus-outline"
            fill={'white'}
            style={{width: 32, height: 32}}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={data}
          style={{
            position: 'absolute',
            right: 10,
            bottom: 10,
            backgroundColor: '#439BFF',
            borderRadius: 10,
            padding: 10,
            width: 50,
            height: 50,
          }}>
          <Icon
            name="download"
            fill={'white'}
            style={{width: 32, height: 32}}
          />
        </TouchableOpacity>
      )}
    </Layout>
  );
};

export default ReportScreen;
