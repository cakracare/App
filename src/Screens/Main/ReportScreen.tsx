import React from 'react';
import {Button, Card, Icon, Layout, Text} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import ButtonCompo from '../../components/ButtonCompo';
import {Touchable, TouchableOpacity, View} from 'react-native';
import CardComp from '../../components/CardComp';

const ReportScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Layout
      style={{
        flex: 1,
        padding: 10,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        <ButtonCompo
          text="Report"
          status="primary"
          onPress={() => {
            navigation.navigate('ReportDetails' as never);
          }}
        />
      </View>
      <Text>Result Report</Text>
      <CardComp
        onPress={() => {
          navigation.navigate('ReportDetails' as never);
        }}
        time="12:00"
        status="success"
        title="Report 1"
      />
      <CardComp
        onPress={() => {
          navigation.navigate('ReportDetails' as never);
        }}
        time="12:00"
        status="success"
        title="Report 1"
      />
    </Layout>
  );
};

export default ReportScreen;
