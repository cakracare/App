import {
  Input,
  InputProps,
  Layout,
  Modal,
  Spinner,
  Text,
} from '@ui-kitten/components';
import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, ToastAndroid, View} from 'react-native';
import ReportComp from '../../components/ReportComp';
import ButtonCompo from '../../components/ButtonCompo';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  getQuestionsByType,
  getUserId,
  createLaporanBullying,
  getGuruByKelas,
} from '../../service';
import {BullyingResponse} from '../../Types';
import {getCurentTime} from '../../helpers/getCurentTime.ts';
import PetunjukComp from '../../components/petunjukComp';
import {sendEmail} from '../../helpers/sendMail.ts';
import {useUser} from '../../helpers/userContext.tsx';
import {guru_sma, guru_smp} from '../../helpers/data_guru.ts';
import {set} from 'zod';
import {ParamListReport} from '../../Types/ParamListBase';

const useInputState = (initialValue = ''): InputProps => {
  const [value, setValue] = React.useState(initialValue);
  return {value, onChangeText: setValue};
};

export default function ReportDetail() {
  const navigation = useNavigation<NavigationProp<ParamListReport>>();
  const route = useRoute<RouteProp<ParamListReport, 'ReportDetail'>>();
  const userid = getUserId();
  const response = route.params?.bullyResponse;
  const [responses, setResponses] = React.useState<any>({});
  const [kategori, setKategori] = useState('');
  const titleInputState = useInputState();
  const deskirpsiInputState = useInputState();
  const {user, setUser} = useUser();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    // Update the responses state with the data from route params
    if (response) {
      setResponses((prevResponses: any) => ({
        ...prevResponses,
        [response.type]: response.total_result_value,
      }));
    }
  }, [response]);

  const createBullyingResponse = async () => {
    try {
      setLoading(true);
      const bullyResponse = {
        userId: userid,
        title: titleInputState.value,
        deskripsi: deskirpsiInputState.value,
        time: getCurentTime(),
        verbalPointResponse: responses['verbal'],
        physicalPointResponse: responses['physical'],
        sexualPointResponse: responses['seksual'],
        cyberPointResponse: responses['cyber'],
        status: 'process',
      } as BullyingResponse;

      bullyResponse.skor_total =
        bullyResponse.cyberPointResponse +
        bullyResponse.physicalPointResponse +
        bullyResponse.sexualPointResponse +
        bullyResponse.verbalPointResponse;
      bullyResponse.kategori = kategori;

      const newReport = await createLaporanBullying(bullyResponse);
      if (!newReport.success) {
        setLoading(false);
        ToastAndroid.show(newReport.message!, ToastAndroid.SHORT);
        return; // Stop execution if report creation fails
      }

      console.log('Report created successfully, sending emails...');
      console.log('================================');
      console.log('DEBUG INFO:');
      console.log('Current user:', user);
      console.log('User email:', user?.email);
      console.log('User kelas:', user?.kelas);
      console.log('================================');

      const guruSMP = ['7', '8', '9'];
      const guruSMA = ['10', '11', '12'];
      let guruEmail: string[] | undefined;
      const guru = await getGuruByKelas();

      console.log('Guru data received:', JSON.stringify(guru, null, 2));
      console.log(
        'User kelas for comparison:',
        user!.kelas,
        'Type:',
        typeof user!.kelas,
      );

      if (guruSMP.includes(user!.kelas!)) {
        guruEmail = guru.guruSMP;
        console.log('User is SMP, using guruSMP emails');
      } else if (guruSMA.includes(user!.kelas!)) {
        guruEmail = guru.guruSMA;
        console.log('User is SMA, using guruSMA emails');
      } else {
        console.error('Kelas tidak valid:', user!.kelas);
        throw new Error(`Kelas tidak valid: ${user!.kelas}`);
      }

      console.log('Selected guru emails:', guruEmail);
      console.log('Number of guru emails:', guruEmail?.length || 0);

      // Send email to each guru individually
      if (guruEmail && guruEmail.length > 0) {
        console.log('Starting to send emails to', guruEmail.length, 'guru(s)');
        for (let i = 0; i < guruEmail.length; i++) {
          const email = guruEmail[i];
          console.log(`Sending email ${i + 1}/${guruEmail.length} to:`, email);

          const guruEmailResult = await sendEmail(
            email,
            'Laporan siswa',
            `ada laporan baru dari ${user?.nama_lengkap} kelas ${user?.kelas}`,
          );
          console.log(`Email ${i + 1} result:`, guruEmailResult);

          if (!guruEmailResult.status) {
            console.error(
              `Failed to send email to ${email}:`,
              guruEmailResult.message,
            );
          }
        }
        console.log('Finished sending all guru emails');
      } else {
        console.warn('No guru email found for this class');
        ToastAndroid.show(
          'Peringatan: Tidak ada email guru untuk kelas ini',
          ToastAndroid.LONG,
        );
      }

      // Send confirmation email to student
      console.log('Sending confirmation email to student:', user!.email);
      const studentEmailResult = await sendEmail(
        user!.email,
        'info laporan',
        'terimakasih sudah membuat laporan, laporan anda sedang kami proses',
      );
      console.log('Email to student result:', studentEmailResult);

      if (studentEmailResult.status) {
        ToastAndroid.show(
          'Laporan berhasil dibuat dan email konfirmasi telah dikirim',
          ToastAndroid.LONG,
        );
      } else {
        ToastAndroid.show(
          'Laporan berhasil dibuat, namun gagal mengirim email konfirmasi',
          ToastAndroid.LONG,
        );
      }

      setLoading(false);
      navigation.navigate('Report', {questions: []});
    } catch (error: any) {
      console.error('Error in createBullyingResponse:', error);
      setLoading(false);
      ToastAndroid.show(
        error.message || 'Terjadi kesalahan saat membuat laporan',
        ToastAndroid.SHORT,
      );
    }
  };

  const getQuestions = useCallback(
    async (type: 'physical' | 'verbal' | 'seksual' | 'cyber') => {
      return await getQuestionsByType(type);
    },
    [route],
  );

  return (
    <ScrollView>
      <Layout
        style={{
          flex: 1,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Modal
          visible={loading}
          animationType="fade"
          backdropStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <Spinner size="giant" status="primary" />
        </Modal>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginStart: 5,
              }}>
              Petunjuk Teknis Pengisian :
            </Text>
          </View>
        </View>
        <View>
          <PetunjukComp
            number={1}
            text="Silahkan Mengisi Seluruh Pertanyaan yang ada dengan jujur."
          />
          <PetunjukComp
            number={2}
            text="Silahkan isi pertanyaan semua kategori dibawah ini."
          />
          <PetunjukComp
            number={3}
            text="Jika  semua kategori sudah diisi, silahkan klik tombol “Sumbit”."
          />
        </View>
        <Input
          label={() => <Text style={{fontWeight: 'bold'}}>Judul laporan</Text>}
          size="medium"
          style={{width: '90%', marginTop: 50}}
          {...titleInputState}
        />
        <Input
          label={() => (
            <Text style={{fontWeight: 'bold'}}>Deskripsi kejadian laporan</Text>
          )}
          multiline={true}
          textStyle={{
            minHeight: 100,
            padding: 5,
            textAlignVertical: 'top',
            width: '90%',
          }}
          style={{width: '90%', margin: 10}}
          // placeholder='Multiline'
          {...deskirpsiInputState}
        />

        <ReportComp
          onPress={async () => {
            const qust = await getQuestions('verbal');
            navigation.navigate('Soal', {questions: qust});
          }}
          text="Verbal"
          status={responses['verbal'] >= 0 ? 'success' : ''}
          icon={require('../../assets/img/speaking.png')}
          color="#2E6CB2"
        />
        <ReportComp
          onPress={async () => {
            const qust = await getQuestions('physical');
            navigation.navigate('Soal', {questions: qust});
          }}
          text="Physical"
          status={responses['physical'] >= 0 ? 'success' : ''}
          icon={require('../../assets/img/physical.png')}
          color="#2E6CB2"
        />
        <ReportComp
          onPress={async () => {
            const qust = await getQuestions('seksual');
            navigation.navigate('Soal', {questions: qust});
          }}
          text="Sexual"
          status={responses['seksual'] >= 0 ? 'success' : ''}
          color="#2E6CB2"
          icon={require('../../assets/img/seksual.png')}
        />
        <ReportComp
          onPress={async () => {
            const qust = await getQuestions('cyber');
            navigation.navigate('Soal', {questions: qust});
          }}
          text="Cyber"
          status={responses['cyber'] >= 0 ? 'success' : ''}
          icon={require('../../assets/img/cyber.png')}
          color="#2E6CB2"
        />
        <ButtonCompo
          text="Submit"
          status="primary"
          width={300}
          disabled={
            responses['verbal'] === undefined ||
            responses['physical'] === undefined ||
            responses['seksual'] === undefined ||
            responses['cyber'] === undefined
          }
          onPress={createBullyingResponse}
        />
        {/*</Layout>*/}
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 2,
  },
  inputTextStyle: {
    minHeight: 100,
    padding: 5,
    textAlignVertical: 'top',
    width: '90%',
  },
});
