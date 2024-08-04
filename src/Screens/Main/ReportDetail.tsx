import {Icon, Input, InputProps, Layout, Text} from '@ui-kitten/components';
import React, {useCallback} from 'react';
import {ScrollView, View} from 'react-native';
import ReportComp from '../../components/ReportComp';
import ButtonCompo from '../../components/ButtonCompo';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {getQuestionsByType} from '../../service/questions.ts';
import {getUserId} from '../../service/user.ts';
import {BullyingResponse, ParamListReport} from '../../Types';
import {getCurentTime} from '../../helpers/getCurentTime.ts';
import {createLaporanBullying} from '../../service/report.ts';
import PetunjukComp from '../../components/petunjukComp';
import {StyleSheet} from 'react-native';

const useInputState = (initialValue = ''): InputProps => {
  const [value, setValue] = React.useState(initialValue);
  return {value, onChangeText: setValue};
};

export default function ReportDetail() {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const userid = getUserId();
  const response = route.params?.bullyResponse;
  const [responses, setResponses] = React.useState<any>({});
  const titleInputState = useInputState();
  const deskirpsiInputState = useInputState();
  console.log(responses);
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
    //  tambhakn try catch
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

    await createLaporanBullying(bullyResponse);
    navigation.navigate('Report');
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
            <Text style={{fontWeight: 'bold'}}>
              Deskripsi lekejadian laporan
            </Text>
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
          status={responses['verbal'] ? 'success' : ''}
          icon={require('../../assets/img/speaking.png')}
          color="#2E6CB2"
        />
        <ReportComp
          onPress={async () => {
            const qust = await getQuestions('physical');
            navigation.navigate('Soal', {questions: qust});
          }}
          text="Physical"
          status={responses['physical'] ? 'success' : ''}
          icon={require('../../assets/img/physical.png')}
          color="#2E6CB2"
        />
        <ReportComp
          onPress={async () => {
            const qust = await getQuestions('seksual');
            navigation.navigate('Soal', {questions: qust});
          }}
          text="Sexual"
          status={responses['seksual'] ? 'success' : ''}
          color="#2E6CB2"
          icon={require('../../assets/img/seksual.png')}
        />
        <ReportComp
          onPress={async () => {
            const qust = await getQuestions('cyber');
            navigation.navigate('Soal', {questions: qust});
          }}
          text="Cyber"
          status={responses['cyber'] ? 'success' : ''}
          icon={require('../../assets/img/cyber.png')}
          color="#2E6CB2"
        />
        <ButtonCompo
          text="Submit"
          status="primary"
          width={300}
          disabled={
            ((responses['verbal'] &&
              responses['physical'] &&
              responses['seksual'] &&
              responses['cyber'] ) === undefined) || ( (titleInputState.value && deskirpsiInputState.value) === '')
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
