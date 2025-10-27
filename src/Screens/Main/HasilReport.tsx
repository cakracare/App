import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {
  Input,
  Button,
  Layout,
  Text,
  Card,
  Modal,
  Spinner,
} from '@ui-kitten/components';
import {
  NavigationProp,
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {
  getLaporanBullying,
  updateLaporanBullying,
} from '../../service/report.ts';
import {Report, User} from '../../Types';
import {useUser} from '../../helpers/userContext.tsx';
import CardHasil from '../../components/CardHasil.tsx';
import {getUser} from '../../service/user.ts';
import {UserRole} from '../../Types/User.ts';

type HasilReportRouteParams = {
  idreport: string;
};

export default function HasilReport() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [feedback, setFeedback] = useState('');
  const [report, setReport] = useState<Report>({} as Report);
  const [userReport, setUserReport] = useState<User>({} as User);
  const [time, setTime] = useState('');
  const route =
    useRoute<RouteProp<{params: HasilReportRouteParams}, 'params'>>();
  const idReport = route.params?.idreport;
  const {user, setUser} = useUser();
  const [loading, setLoading] = useState(false);
  const [kategori, setKategori] = useState('');
  const total_point =
    report.cyberPointResponse +
    report.physicalPointResponse +
    report.sexualPointResponse +
    report.verbalPointResponse;

  useEffect(() => {
    const data = async () => {
      console.log('1');
      const laporan = await getLaporanBullying(idReport);
      const dataUser = await getUser(laporan.data?.userId);
      return {laporan, dataUser};
    };

    data().then(result => {
      // guard against undefined DocumentData before updating state
      if (result.laporan?.data) {
        setReport(result.laporan.data as Report);
      } else {
        setReport({} as Report);
      }

      if (result.dataUser?.data) {
        setUserReport(result.dataUser.data as User);
      } else {
        setUserReport({} as User);
      }
    });

    if (total_point < 18) {
      setKategori('ringan');
    } else if (total_point >= 18 && total_point < 32) {
      setKategori('sedang');
    } else {
      setKategori('berat');
    }
  }, [total_point]);

  const handleUdpateReport = async () => {
    try {
      setLoading(true);
      report.feedback = feedback || report.feedback;
      report.status = 'success';
      report.kategori = kategori;
      const updatedReport = {
        ...report,
        timestamp:
          report.timestamp instanceof Date
            ? report.timestamp.getTime()
            : report.timestamp,
      };
      const iupdateReport = await updateLaporanBullying(
        idReport,
        updatedReport,
      );
      setLoading(false);
      if (iupdateReport.success) {
        navigation.navigate('Report');
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <Layout style={styles.container}>
      <Modal
        visible={loading}
        animationType="fade"
        backdropStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <Spinner size="giant" status="primary" />
      </Modal>

      {user?.role === 'guru' ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Card style={styles.card}>
            <CardHasil label="Nama Pelapor :" text={userReport?.nama_lengkap} />
            <CardHasil
              label="Kelas                 :"
              text={userReport?.kelas}
            />
            <CardHasil
              label="Alamat              :"
              text={userReport?.alamat_lengkap}
            />
            <CardHasil
              label="Tgl Pelaporan  :"
              text={report.timestamp?.toString().slice(0, 16)}
            />
            <Text category="label" style={styles.text}>
              ===================================
            </Text>
            <CardHasil label="Verbal     :" text={report.verbalPointResponse} />
            <CardHasil label="Cyber      :" text={report.cyberPointResponse} />
            <CardHasil label="Physical :" text={report.physicalPointResponse} />
            <CardHasil label="Sexual    :" text={report.sexualPointResponse} />
            <Text category="label" style={styles.text}>
              ===================================
            </Text>
            <CardHasil
              label="Total Point Response :"
              text={report.skor_total || total_point}
            />
            <CardHasil label="Kategori :" text={report.kategori || kategori} />
            <CardHasil label="Status :" text={report.status} />

            <Input
              label={() => (
                <Text style={{fontWeight: 'bold', marginVertical: 20}}>
                  Masukkan Feedback
                </Text>
              )}
              disabled={user?.role !== 'guru'}
              multiline={true}
              value={report.feedback}
              textStyle={{
                minHeight: 100,
                padding: 5,
                textAlignVertical: 'top',
              }}
              onChangeText={nextValue => setFeedback(nextValue)}
            />
            <Button style={styles.button} onPress={handleUdpateReport}>
              Submit
            </Button>
          </Card>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Card style={styles.card}>
            <Text category="h6" style={styles.header}>
              Detail Laporan
            </Text>
            <CardHasil label="Judul :" text={report.title} />
            <CardHasil label="Deskripsi :" text={report.deskripsi} />
            <Text category="label" style={styles.text}>
              ===================================
            </Text>
            <CardHasil label="Verbal     :" text={report.verbalPointResponse} />
            <CardHasil label="Cyber      :" text={report.cyberPointResponse} />
            <CardHasil label="Physical :" text={report.physicalPointResponse} />
            <CardHasil label="Sexual    :" text={report.sexualPointResponse} />
            <Text category="label" style={styles.text}>
              ===================================
            </Text>
            <CardHasil
              label="Total Point :"
              text={report.skor_total || total_point}
            />
            <CardHasil label="Kategori :" text={report.kategori || kategori} />
            <CardHasil label="Status :" text={report.status} />

            <Input
              label={() => (
                <Text style={{fontWeight: 'bold', marginVertical: 20}}>
                  Feedback
                </Text>
              )}
              disabled={true}
              multiline={true}
              value={report.feedback}
              textStyle={{
                minHeight: 100,
                padding: 5,
                textAlignVertical: 'top',
              }}
            />
          </Card>
        </ScrollView>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    marginTop: 10,
  },
  header: {
    marginBottom: 15,
    margin: 15,
  },
  text: {
    marginVertical: 5,
  },
  input: {
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
  },
});
