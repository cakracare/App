import React, {useCallback} from 'react';
import { Layout, List} from '@ui-kitten/components';
import SoalCompo from '../../components/SoalCompo';
import ButtonCompo from '../../components/ButtonCompo';
import {NavigationProp, useNavigation, useRoute} from '@react-navigation/native';
import {Questions} from "../../Types/Questions.ts";
import {Alert} from "react-native";



export default function Soal() {
    const route = useRoute();
    const navigation = useNavigation<NavigationProp<any>>();
    const {questions} = route.params;
    const [answers, setAnswers] = React.useState<Questions[]>(questions);

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

    const handleCreateReport = ()=>{
       try {
           const totalSum = answers.reduce((sum, item) => {
               return sum + (item.selectedOption || 0);
           }, 0);

           const resultObject = answers.reduce((acc, item) => {
               acc[item.question!] = item.selectedOption || 0;
               return acc;}, {} as Record<string, number>);
           /*
           { bullyResponse : {type: 'cyber', totalPoint: 0} },
            */
           navigation.navigate('ReportDetail', { bullyResponse: {type: answers[0].type, result: resultObject, total_result_value: totalSum},});
       }catch (error: any){
           Alert.alert(error);
       }

    }

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <List
                style={{ flex: 1, padding: 10 , marginBottom: 20 }}
                data={answers}
                renderItem={({ item }) => (
                    <SoalCompo
                        key={item.id}
                        text={item.question}
                        checked={item.isChecked}
                        setChecked={(value: boolean) => handleCheckedChange(item.id!, value)}
                        selectedOption={item.selectedOption}
                        setSelectedOption={(option: number) => handleOptionChange(item.id!, option)}
                    />
                )}
            />
            <ButtonCompo
                text="Submit"
                status="primary"
                onPress={handleCreateReport}
            />
        </Layout>
    );
}
