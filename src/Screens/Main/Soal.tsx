import React from 'react';
import {View} from 'react-native';
import {Layout, List, Radio, Text} from '@ui-kitten/components';
import SoalCompo from '../../components/SoalCompo';
import ButtonCompo from '../../components/ButtonCompo';
import {useNavigation} from '@react-navigation/native';

export default function Soal() {
  const [checkedItems, setCheckedItems] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [selectedOption, setSelectedOption] = React.useState('');
  const navigation = useNavigation();
  const data = [
    {key: '1', soal: 'Apakah anda pernah mengalami kekerasan?'},
    {key: '2', soal: 'Apakah anda pernah mengalami kekerasan?aaaaaaaaa'},
  ];
  const handleCheckedChange = (key: string, value: boolean) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <List
        style={{flex: 1, padding: 10}}
        data={data}
        renderItem={({item}) => (
          <SoalCompo
            key={item.key}
            text={item.soal}
            checked={!!checkedItems[item.key]}
            setChecked={(value: boolean) =>
              handleCheckedChange(item.key, value)
            }
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
