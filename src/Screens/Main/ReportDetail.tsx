/*
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import ReportComp from '../../components/ReportComp';
import ButtonCompo from '../../components/ButtonCompo';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View} from 'react-native';
import PetunjukComp from '../../components/petunjukComp';
*/
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
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

export default function ReportDetail() {
  const navigation = useNavigation<NavigationProp<ParamListReport>>();
  const route = useRoute();
  const userid = getUserId();
  const response = route.params?.bullyResponse || null;
  const [responses, setResponses] = React.useState<any>({});

  React.useEffect(() => {
    // Update the responses state with the data from route params
    if (response) {
      setResponses((prevResponses: any) => ({
        ...prevResponses,
        [response.type]: response.result,
      }));
    }
  }, [response]);

  const createBullyingResponse = async () => {
    const bullyResponse = {
      userId: userid,
      // title
      time: getCurentTime(),
      // desk
      verbalBullyingResponse: responses['verbal'],
      physicalBullyingResponse: responses['physical'],
      sexualBullyingResponse: responses['seksual'],
      cyberBullyingResponse: responses['cyber'],
      // status
    } as BullyingResponse;

    await createLaporanBullying(bullyResponse);
  };

  const getQuestions = async (
    type: 'physical' | 'verbal' | 'seksual' | 'cyber',
  ) => {
    return await getQuestionsByType(type);
  };

  return (
    <Layout
      style={{
        flex: 1,
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Icon
          name="edit-outline"
          fill="black"
          style={{width: 30, height: 30}}
        />
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
      <Layout
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ReportComp
          onPress={async () => {
            const qust = await getQuestions('verbal');
            navigation.navigate('Soal', {questions: qust});
          }}
          text="Verbal"
          status={responses['verbal'] ? 'success' : ''}
          icon={require('../../assets/img/speaking.png')}
          color="#7C7C7C"
        />
        <ReportComp
          onPress={async () => {
            const qust = await getQuestions('physical');
            navigation.navigate('Soal', {questions: qust});
          }}
          text="Physical"
          status={responses['physical'] ? 'success' : ''}
          icon={require('../../assets/img/physical.png')}
          color="#717171"
        />
        <ReportComp
          onPress={async () => {
            const qust = await getQuestions('seksual');
            navigation.navigate('Soal', {questions: qust});
          }}
          text="Sexual"
          status={responses['seksual'] ? 'success' : ''}
          color="#4F4F4F"
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
          color="#4B4B4B"
        />
        <ButtonCompo
          text="Submit"
          status="primary"
          onPress={() => {
            navigation.navigate('ReportScreen' as never);
          }}
        />
      </Layout>
    </Layout>
  );
}
