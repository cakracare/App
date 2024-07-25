import React from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

const ReportScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Layout
      style={{
        flex: 1,
        padding: 10,
      }}>
      <Button
        style={{marginBottom: 10, borderRadius: 10, backgroundColor: '#00B2FF'}}
        onPress={() => navigation.navigate('Add Report')}>
        Add Report
      </Button>
    </Layout>
  );
};

export default ReportScreen;
