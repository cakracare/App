import {Button, Layout, Text} from '@ui-kitten/components';
import React, {useCallback} from 'react';
import ReportComp from '../../components/ReportComp';
import ButtonCompo from '../../components/ButtonCompo';
import {NavigationProp, useNavigation, useRoute} from '@react-navigation/native';
import {Image, TouchableOpacity, View} from 'react-native';
import {getQuestionsByType} from "../../service/questions.ts";

export default function  ReportDetail() {
    const navigation = useNavigation<NavigationProp<any>>();
  const getQuestions = async (type: "physical" | "verbal" | "seksual" | "cyber")=>{
      return await getQuestionsByType(type)
  }
  return (
    <Layout
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <ReportComp
          onPress={async () => {
              const qust = await getQuestions('verbal')
              navigation.navigate('Soal', { questions: qust});
          }}
        text="Verbal"
        status="success"
        icon={require('../../assets/img/speaking.png')}
      />
      <ReportComp
        onPress={async () => {
          const qust = await getQuestions('physical')
          navigation.navigate('Soal', { questions: qust});
        }}
        text="Physical"
        status=""
        icon={require('../../assets/img/physical.png')}
      />

      <ReportComp
          onPress={async () => {
              const qust = await getQuestions('seksual')
              navigation.navigate('Soal', { questions: qust});
          }}
        text="Sexual"
        status=""
        icon={require('../../assets/img/seksual.png')}
      />
      <ReportComp
          onPress={async () => {
              const qust = await getQuestions('cyber')
              navigation.navigate('Soal', { questions: qust});
          }}
        text="Cyber"
        status=""
        icon={require('../../assets/img/cyber.png')}
      />
      <ButtonCompo
        text="Submit"
        status="primary"
        onPress={() => {
          navigation.navigate('Report');
        }}
      />
    </Layout>
  );
}
