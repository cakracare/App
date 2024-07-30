import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import ButtonCompo from '../../components/ButtonCompo';
import {View} from 'react-native';
import CardComp from '../../components/CardComp';

const ReportScreen: React.FC = () => {
   const navigation = useNavigation<NavigationProp<any>>();

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
            navigation.navigate('ReportNavigator', {screen: "ReportDetail"});
          }}
        />
      </View>
      <Text>Result Report</Text>
      <CardComp
        onPress={() => {
          navigation.navigate('ReportDetail');
        }}
        time="12:00"
        status="success"
        title="Report 1"
      />
      <CardComp
        onPress={() => {
          navigation.navigate('ReportDetail');
        }}
        time="12:00"
        status="success"
        title="Report 1"
      />
    </Layout>
  );
};

export default ReportScreen;
