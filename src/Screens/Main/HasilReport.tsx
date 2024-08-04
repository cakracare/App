import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
<<<<<<< HEAD
import {Input, Button, Layout, Text, Card} from '@ui-kitten/components';
=======
import {
  Input,
  Button,
  Layout,
  Text,
  Card,
  Spinner,
  Modal,
} from '@ui-kitten/components';
>>>>>>> 6771e169155eb616d5e61e2a351a71f3d59ed0da
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
<<<<<<< HEAD
import {getLaporanBullying} from '../../service/report.ts';
import {Report} from '../../Types';
import {useUser} from '../../helpers/userContext.tsx';
import HasilCompo from '../../components/CardHasil.tsx';
import CardHasil from '../../components/CardHasil.tsx';
=======
import {
  getLaporanBullying,
  updateLaporanBullying,
} from '../../service/report.ts';
import {Report, User} from '../../Types';
import {useUser} from '../../helpers/userContext.tsx';
import HasilCompo from '../../components/CardHasil.tsx';
import CardHasil from '../../components/CardHasil.tsx';
import {getUser} from '../../service/user.ts';
>>>>>>> 6771e169155eb616d5e61e2a351a71f3d59ed0da

export default function HasilReport() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [feedback, setFeedback] = useState('');
  const [report, setReport] = useState<Report>({});
<<<<<<< HEAD
  const [time, setTime] = useState('');
  const route = useRoute();
  const response = route.params?.idreport;
  const {user, setUser} = useUser();

  useEffect(() => {
    const data = async () => {
      return getLaporanBullying(response);
    };

    data().then(result => {
      setReport(result.data);
    });
  }, []);

  return (
    <Layout style={styles.container}>
      {user!.role === 'guru' ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Card style={styles.card}>
            <CardHasil label="Nama Pelapor :" text={user?.nama_lengkap} />
            <CardHasil label="Kelas                 :" text={user?.kelas} />
            <CardHasil
              label="Alamat              :"
              text={user?.alamat_lengkap}
            />
            <CardHasil
              label="Tgl Pelaporan  :"
              text={report.timestamp?.toString().slice(0, 16)}
=======
  const [userReport, setUserReport] = useState<User>({});
  const [time, setTime] = useState('');
  const route = useRoute();
  const idReport = route.params?.idreport;
  const {user, setUser} = useUser();
  const [loading, setLoading] = useState(false);
  const [kategori,setKategori]=useState('')
  const total_point = report.cyberPointResponse +
      report.physicalPointResponse +
      report.sexualPointResponse +
      report.verbalPointResponse

  useEffect(() => {
    const data = async () => {
      const laporan = await getLaporanBullying(idReport);
      const dataUser  = await getUser(laporan.data?.userId);
      return {laporan,dataUser}
    };


    data().then(result => {
      setReport(result.laporan.data);
      setUserReport(result.dataUser.data)
    });





    if(total_point < 18){
      setKategori('ringan')
    }else if(total_point > 18 || total_point <32){
      setKategori('sedang')
    }else if(total_point > 18){
      setKategori('berat')
    }
  }, [total_point]);

  const handleUdpateReport = async ()=>{
    // console.log('sdfsdf')
      try {
        setLoading(true);
        report.feedback = feedback || report.feedback
        report.status = 'success'
        report.kategori = kategori
        const iupdateReport = await updateLaporanBullying(idReport,report)
        // console.log(iupdateReport,'sdfsdfdsfdsfdffd');
        setLoading(false);
        if (iupdateReport.success){
          navigation.navigate('Report')
        }
      }catch(e){
        console.log(e)
        setLoading(false);
      }
    // console.log('Udpate Report');
  }



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
>>>>>>> 6771e169155eb616d5e61e2a351a71f3d59ed0da
            />
          </Card>
          <Card style={styles.card}>
            <Text category="h5" style={styles.header}>
              Hasil Report
            </Text>
<<<<<<< HEAD
            <CardHasil
              label="Verbal      :"
              text={report.verbalPointResponse}
            />
            <CardHasil label="Cyber       :" text={report.cyberPointResponse} />
            <CardHasil
              label="Physical  :"
              text={report.physicalPointResponse}
            />
            <CardHasil label="Sexual     :" text={report.sexualPointResponse} />
            <Text category="label" style={styles.text}>
              ===================================
            </Text>
            <CardHasil
              label="Total Point Response :"
              text={
                report.cyberPointResponse +
                report.physicalPointResponse +
                report.sexualPointResponse +
                report.verbalPointResponse
              }
            />
            <CardHasil label="Status :" text={report.status} />
=======
            <CardHasil label="Verbal     :" text={report.verbalPointResponse} />
            <CardHasil label="Cyber      :" text={report.cyberPointResponse} />
            <CardHasil label="Physical :" text={report.physicalPointResponse} />
            <CardHasil label="Sexual    :" text={report.sexualPointResponse} />
            <Text category="label" style={styles.text}>
              ===================================
            </Text>
            <CardHasil label="Total Point Response :" text={total_point} />
            <CardHasil label="Kategori :" text={kategori} />
            <CardHasil label="Status :" text={report.status} />

>>>>>>> 6771e169155eb616d5e61e2a351a71f3d59ed0da

            <Input
              label={() => (
                <Text style={{fontWeight: 'bold', marginVertical: 20}}>
                  Masukkan Feedback
                </Text>
              )}
              disabled={user?.role === 'siswa'}
              multiline={true}
<<<<<<< HEAD
=======
              value={report.feedback}
>>>>>>> 6771e169155eb616d5e61e2a351a71f3d59ed0da
              textStyle={{
                minHeight: 100,
                padding: 5,
                textAlignVertical: 'top',
              }}
<<<<<<< HEAD
            />
            <Button style={styles.button}>Submit</Button>
=======
              onChangeText={nextValue => setFeedback(nextValue)}
            />
            <Button style={styles.button} onPress={handleUdpateReport}>Submit</Button>
>>>>>>> 6771e169155eb616d5e61e2a351a71f3d59ed0da
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
<<<<<<< HEAD
=======
          value={report.feedback}
>>>>>>> 6771e169155eb616d5e61e2a351a71f3d59ed0da
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
