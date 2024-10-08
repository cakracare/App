import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, ToastAndroid} from 'react-native';
import {
  Input,
  Button,
  Layout,
  Text,
  Card,
  Spinner,
  Modal,
} from '@ui-kitten/components';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  getLaporanBullying,
  updateLaporanBullying,
  getUser,
} from '../../service';
import {Report, User} from '../../Types';
import {useUser} from '../../helpers/userContext.tsx';
import CardHasil from '../../components/CardHasil.tsx';
import {sendEmail} from "../../helpers/sendMail.ts";
import {set} from "zod";

export default function HasilReport() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [feedback, setFeedback] = useState('');
  const [report, setReport] = useState<Report>({});
  const [userReport, setUserReport] = useState<User>({});
  const [time, setTime] = useState('');
  const route = useRoute();
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
      console.log('1')
      const laporan = await getLaporanBullying(idReport);
      const dataUser = await getUser(laporan.data?.userId);
      return {laporan, dataUser};
    };
    data().then(result => {
      setReport(result.laporan.data);
      setUserReport(result.dataUser.data);
    });

    if (total_point < 18) {
      setKategori('ringan');
    } else if (total_point > 18 || total_point < 32) {
      setKategori('sedang');
    } else if (total_point > 18) {
      setKategori('berat');
    }
  }, [total_point]);



  const handleUdpateReport = async () => {
    if(feedback){
      try {
        setLoading(true);
        report.feedback = feedback || report.feedback;
        report.status = 'success';
        report.kategori = kategori;
        const iupdateReport = await updateLaporanBullying(idReport, report!);

        if (iupdateReport.success) {
          const isSend =  await sendEmail(userReport.email,'Info laporan', 'laporan kamu sudah di proses, silahkan check!!')
          if (!isSend.status){
            ToastAndroid.show(isSend.message, ToastAndroid.SHORT);
            setLoading(false);
          }
          setLoading(false);
          ToastAndroid.show('Feedback berhasil dikirim', ToastAndroid.SHORT);
          navigation.navigate('Report');
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
    ToastAndroid.show('Feedback belum diisi', ToastAndroid.SHORT);
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
          </Card>
          <Card style={styles.card}>
            <Text category="h5" style={styles.header}>
              Hasil Report
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
              disabled={user.role === 'siswa'}
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
        <Input
          label={() => (
            <Text style={{fontWeight: 'bold', marginVertical: 20}}>
              Feedback
            </Text>
          )}
          disabled={user?.role === 'siswa'}
          multiline={true}
          value={report.feedback}
          textStyle={{
            minHeight: 100,
            padding: 5,
            textAlignVertical: 'top',
          }}
        />
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
