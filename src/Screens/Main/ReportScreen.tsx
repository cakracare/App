import React from 'react';
import {Button, Card, Icon, Layout, List, Text} from '@ui-kitten/components';
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
      <List
        data={['Report 1', 'Report 2', 'Report 3']}
        renderItem={({item}) => (
          <CardComp
            onPress={() => {
              navigation.navigate('HasilReport' as never);
            }}
            time="12:00"
            status="success"
            title={item}
            text="Success"
          />
        )}
      />
    </Layout>
  );
};

export default ReportScreen;
