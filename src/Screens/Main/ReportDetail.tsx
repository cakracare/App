import {Layout} from '@ui-kitten/components';
import React from 'react';
import ReportComp from '../../components/ReportComp';
import ButtonCompo from '../../components/ButtonCompo';
import {NavigationProp, useNavigation, useRoute} from '@react-navigation/native';
import {getQuestionsByType} from "../../service/questions.ts";
import {getUserId} from "../../service/user.ts";
import {BullyingResponse, ParamListReport} from "../../Types";
import {getCurentTime} from "../../helpers/getCurentTime.ts";
import {createLaporanBullying} from "../../service/report.ts";

export default function  ReportDetail() {
  const navigation = useNavigation<NavigationProp<ParamListReport>>();
  const route = useRoute();
  const userid = getUserId()
  const response = route.params?.bullyResponse || null
  const [responses, setResponses] = React.useState<any>({});

    React.useEffect(() => {
        // Update the responses state with the data from route params
        if (response) {
            setResponses((prevResponses: any) => ({
                ...prevResponses,
                [response.type]: response.result,
            }));
        }
    }, [response]);


    const createBullyingResponse = async ()=> {
       const bullyResponse = {
           userId: userid,
           // title
           time: getCurentTime(),
           // desk
           verbalBullyingResponse: responses['verbal'],
           physicalBullyingResponse: responses['physical'],
           sexualBullyingResponse: responses['seksual'],
           cyberBullyingResponse: responses['cyber'],
            // status
       } as BullyingResponse;

       await createLaporanBullying(bullyResponse)
    }
    
  const getQuestions = async (type: "physical" | "verbal" | "seksual" | "cyber")=>{
      return await getQuestionsByType(type)
  }
  
  return (
    <Layout
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <ReportComp
          onPress={async () => {
              const qust = await getQuestions('verbal')
              navigation.navigate('Soal', { questions: qust});
          }}
        text="Verbal"
        status={responses['verbal'] ? 'success':""}
        icon={require('../../assets/img/speaking.png')}
      />
      <ReportComp
        onPress={async () => {
          const qust = await getQuestions('physical')
          navigation.navigate('Soal', { questions: qust});
        }}
        text="Physical"
        status={responses['physical'] ? 'success':""}
        icon={require('../../assets/img/physical.png')}
      />

      <ReportComp
          onPress={async () => {
              const qust = await getQuestions('seksual')
              navigation.navigate('Soal', { questions: qust});
          }}
        text="Sexual"
        status={responses['seksual'] ? 'success':""}
        icon={require('../../assets/img/seksual.png')}
      />
      <ReportComp
          onPress={async () => {
              const qust = await getQuestions('cyber')
              navigation.navigate('Soal', { questions: qust});
          }}
        text="Cyber"
        status={responses['cyber'] ? 'success':""}
        icon={require('../../assets/img/cyber.png')}
      />
      <ButtonCompo
        text="Submit"
        status="primary"
        disabled={((responses['verbal'] && responses['physical'] && responses['seksual'] && responses['cyber'])=== undefined)}
        onPress={createBullyingResponse}
      />
    </Layout>
  );
}
