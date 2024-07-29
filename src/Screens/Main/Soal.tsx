import React from 'react';
import {View} from 'react-native';
import {Layout, List, Radio, Text} from '@ui-kitten/components';
import SoalCompo from '../../components/SoalCompo';
import ButtonCompo from '../../components/ButtonCompo';
import {useNavigation} from '@react-navigation/native';

export default function Soal() {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [selectedOption, setSelectedOption] = React.useState('');
  const navigation = useNavigation();
  const data = [
    {key: '1', soal: 'Apakah anda pernah mengalami kekerasan?'},
    {key: '2', soal: 'Apakah anda pernah mengalami kekerasan?aaaaaaaaa'},
    // {key: '3', soal: 'Apakah anda pernah mengalami kekerasan?aaaa'},
    // {key: '1', soal: 'Apakah anda pernah mengalami kekerasan?'},
    // {key: '2', soal: 'Apakah anda pernah mengalami kekerasan?aaaaaaaaa'},
    // {key: '3', soal: 'Apakah anda pernah mengalami kekerasan?aaaa'},
    // {key: '1', soal: 'Apakah anda pernah mengalami kekerasan?'},
    // {key: '2', soal: 'Apakah anda pernah mengalami kekerasan?aaaaaaaaa'},
    // {key: '3', soal: 'Apakah anda pernah mengalami kekerasan?aaaa'},
    // {key: '1', soal: 'Apakah anda pernah mengalami kekerasan?'},
    // {key: '2', soal: 'Apakah anda pernah mengalami kekerasan?aaaaaaaaa'},
    // {key: '3', soal: 'Apakah anda pernah mengalami kekerasan?aaaa'},
  ];
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <List
        style={{flex: 1, padding: 10}}
        data={data}
        renderItem={({item}) => (
          <SoalCompo
            keye={item.key} // Compare keye with item.key
            key={'dfsdf'}
            text={item.soal}
            checked={checked} // Convert checked to string and compare with item.key.toString()
            setChecked={setChecked} // Compare setChecked with true
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        )}
      />
      <ButtonCompo
        text="Submit"
        status="primary"
        onPress={() => {
          navigation.navigate('ReportDetails' as never);
        }}
      />
    </Layout>
  );
}
