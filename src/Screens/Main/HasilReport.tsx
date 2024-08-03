import React, {useCallback, useEffect, useState} from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Input, Button, Layout, Text, Card } from '@ui-kitten/components';
import {NavigationProp, useNavigation, useRoute} from '@react-navigation/native';
import {getLaporanBullying} from "../../service/report.ts";
import {Report} from "../../Types";
import {useUser} from "../../helpers/userContext.tsx";

export default function HasilReport() {
  const [feedback, setFeedback] = useState('');
  const [report, setReport] = useState<Report>({});
  const [time,setTime]=useState('')
  const route = useRoute();
  const response = route.params?.idreport
  const {user,setUser}=useUser()

  useEffect(() => {
     const data = async ()=>{
       return getLaporanBullying(response)
     }

     data().then((result  )=>{
       setReport(result.data)
     })

  },[]);

  return (
      <Layout style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Card style={styles.card}>
            <Text category='label' style={styles.text}>Nama Pelapor: {user?.nama_lengkap}</Text>
            <Text category='label' style={styles.text}>Kelas: {user?.kelas}</Text>
            <Text category='label' style={styles.text}>Alamat: {user?.alamat_lengkap}</Text>
            <Text category='label' style={styles.text}>tgl pelaporan: {report.timestamp?.toString().slice(0,16)}</Text>
            <Text category='h5' style={styles.header}>Hasil Report</Text>
            <Text category='label' style={styles.text}>Verbal Point Response: {report.verbalPointResponse}</Text>
            <Text category='label' style={styles.text}>Physical Point Response: {report.physicalPointResponse}</Text>
            <Text category='label' style={styles.text}>Sexual Point Response: {report.sexualPointResponse}</Text>
            <Text category='label' style={styles.text}>Cyber Point Response: {report.cyberPointResponse}</Text>
            <Text category='label' style={styles.text}>===================================</Text>
            <Text category='label' style={styles.text}>Total Point Response: {report.cyberPointResponse + report.cyberPointResponse
                + report.sexualPointResponse + report.verbalPointResponse}</Text>
            <Text category='label' style={styles.text}>Status: {report.status}</Text>

            <Input
                label={() => <Text style={{fontWeight:"bold",color:'black'}}>Deskripsi lekejadian laporan</Text>}
                disabled={user?.role==='siswa'}
                multiline={true}
                textStyle={{minHeight: 100,
                  padding: 5,
                  textAlignVertical: 'top'}}
            />
            {user!.role === 'guru'?<Button style={styles.button}>
            Submit
          </Button>:''}
          </Card>
        </ScrollView>
      </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    padding: 20,
  },
  header: {
    marginBottom: 15,
    margin: 15
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
