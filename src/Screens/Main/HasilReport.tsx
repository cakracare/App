import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Input, Button, Layout, Text, Card} from '@ui-kitten/components';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {getLaporanBullying} from '../../service/report.ts';
import {Report} from '../../Types';
import {useUser} from '../../helpers/userContext.tsx';
import HasilCompo from '../../components/CardHasil.tsx';
import CardHasil from '../../components/CardHasil.tsx';

export default function HasilReport() {
  const [feedback, setFeedback] = useState('');
  const [report, setReport] = useState<Report>({});
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
            <CardHasil label="Kelas :" text={user?.kelas} />
            <CardHasil label="Alamat :" text={user?.alamat_lengkap} />
            <CardHasil
              label="Tgl Pelaporan :"
              text={report.timestamp?.toString().slice(0, 16)}
            />
          </Card>
          <Card style={styles.card}>
            <Text category="h5" style={styles.header}>
              Hasil Report
            </Text>
            <CardHasil label="Verbal :" text={report.verbalPointResponse} />
            <CardHasil label="Cyber :" text={report.cyberPointResponse} />
            <CardHasil label="Physical :" text={report.physicalPointResponse} />
            <CardHasil label="Sexual :" text={report.sexualPointResponse} />
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

            <Input
              label={() => (
                <Text style={{fontWeight: 'bold', marginVertical: 20}}>
                  Masukkan Feedback
                </Text>
              )}
              disabled={user?.role === 'siswa'}
              multiline={true}
              textStyle={{
                minHeight: 100,
                padding: 5,
                textAlignVertical: 'top',
              }}
            />
            <Button style={styles.button}>Submit</Button>
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
