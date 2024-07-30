import React, {useCallback} from 'react';
import { View } from 'react-native';
import { Layout, List, Radio, Text } from '@ui-kitten/components';
import SoalCompo from '../../components/SoalCompo';
import ButtonCompo from '../../components/ButtonCompo';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getQuestionsByType} from "../../service/questions.ts";
import {Questions} from "../../Types/Questions.ts";


export default function Soal() {
    const route = useRoute();
    // const [data, setData] = React.useState<any[]>([]);
    const questins = route.params?.questions || [];

    // console.log(questins)

    const [answers, setAnswers] = React.useState<Questions[]>(questins);



    const navigation = useNavigation();

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
                    const result = answers.map((item: Questions) =>{
                        console.log(item.question, (item.selectedOption?item.selectedOption:0));
                        return {
                            question: item.question,
                            answersValue: item.selectedOption?item.selectedOption:0,
                        }
                    })

                    console.log(result)
                }}
            />
        </Layout>
    );
}
