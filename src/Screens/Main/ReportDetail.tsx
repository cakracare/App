import {Button, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import ReportComp from '../../components/ReportComp';
import ButtonCompo from '../../components/ButtonCompo';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';

export function ReportDetail() {
  const navigation = useNavigation();
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ReportComp
        onPress={() => {
          navigation.navigate('Soal' as never);
        }}
        text="Verbal"
        status="success"
        icon={require('../../assets/img/speaking.png')}
      />
      <ReportComp
        onPress={() => {
          navigation.navigate('Soal' as never);
        }}
        text="Physical"
        status=""
        icon={require('../../assets/img/physical.png')}
      />
      <ReportComp
        onPress={() => {
          navigation.navigate('Soal' as never);
        }}
        text="Sexual"
        status=""
        icon={require('../../assets/img/seksual.png')}
      />
      <ReportComp
        onPress={() => {
          navigation.navigate('Soal' as never);
        }}
        text="Cyber"
        status=""
        icon={require('../../assets/img/cyber.png')}
      />
      <ButtonCompo
        text="Submit"
        status="primary"
        onPress={() => {
          navigation.navigate('ReportScreen' as never);
        }}
      />
    </Layout>
  );
}
