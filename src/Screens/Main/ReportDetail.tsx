import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import ReportComp from '../../components/ReportComp';
import ButtonCompo from '../../components/ButtonCompo';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View} from 'react-native';
import PetunjukComp from '../../components/petunjukComp';

export function ReportDetail() {
  const navigation = useNavigation();
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
          onPress={() => {
            navigation.navigate('Soal' as never);
          }}
          text="Verbal"
          status="success"
          icon={require('../../assets/img/speaking.png')}
          color="#7C7C7C"
        />
        <ReportComp
          onPress={() => {
            navigation.navigate('Soal' as never);
          }}
          text="Physical"
          status=""
          icon={require('../../assets/img/physical.png')}
          color="#717171"
        />
        <ReportComp
          onPress={() => {
            navigation.navigate('Soal' as never);
          }}
          text="Sexual"
          status=""
          icon={require('../../assets/img/seksual.png')}
          color="#4F4F4F"
        />
        <ReportComp
          onPress={() => {
            navigation.navigate('Soal' as never);
          }}
          text="Cyber"
          status=""
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
