import React, {useCallback} from 'react';
import { View } from 'react-native';
import { Layout, List, Radio, Text } from '@ui-kitten/components';
import SoalCompo from '../../components/SoalCompo';
import ButtonCompo from '../../components/ButtonCompo';
import {NavigationProp, useNavigation, useRoute} from '@react-navigation/native';
import {getQuestionsByType} from "../../service/questions.ts";
import {Questions} from "../../Types/Questions.ts";
import {ParamListReport} from "../../Types";


export default function Soal() {
/*
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
*/
    const route = useRoute();
    const navigation = useNavigation<NavigationProp<any>>();
    const questins = route.params?.questions || [];
    const [answers, setAnswers] = React.useState<Questions[]>(questins);



    const handleCheckedChange = (key: string | null, value: boolean) => {
        setAnswers(prevAnswers =>
            prevAnswers.map(answer =>
                answer.id === key
                    ? { ...answer, isChecked: value || false, selectedOption: value ? answer.selectedOption : 0 }
                    : answer
            )
        );
    };

    const handleOptionChange = (key: string | null, option: number) => {
        setAnswers(prevAnswers =>
            prevAnswers.map(answer =>
                answer.id === key ? { ...answer, selectedOption: option } : answer
            )
        );
    };

    // console.info(answers);
    /*
    { type: 'type_of_bully', quest: 'Apakah anda pernah mengalami kekerasan?', incedent: false, point: 0 },
     */

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <List
                style={{ flex: 1, padding: 10 }}
                data={answers}
                renderItem={({ item }) => (
                    <SoalCompo
                        key={item.id}
                        text={item.question}
                        checked={item.isChecked}
                        setChecked={(value: boolean) => handleCheckedChange(item.id, value)}
                        selectedOption={item.selectedOption}
                        setSelectedOption={(option: number) => handleOptionChange(item.id, option)}
                    />
                )}
            />
            <ButtonCompo
                text="Submit"
                status="primary"
                onPress={() => {
                    const totalSum = answers.reduce((sum, item) => {
                        return sum + (item.selectedOption || 0);
                    }, 0);



                    const resultObject = answers.reduce((acc, item) => {
                        acc[item.question] = item.selectedOption || 0;
                        return acc;
                    }, {} as Record<string, number>);


                    navigation.navigate('ReportDetail', { bullyResponse: {type: answers[0].type, result: resultObject, total_result_value: totalSum},});
                }}
            />
        </Layout>
    );
}
