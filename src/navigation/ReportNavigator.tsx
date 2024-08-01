import * as React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ReportScreen from "../Screens/Main/ReportScreen.tsx";
import ReportDetail from "../Screens/Main/ReportDetail.tsx";
import Soal from "../Screens/Main/Soal.tsx";
import {ParamListReport} from "../Types";
import {useUser} from "../helpers/userContext.tsx";


const ReportStack = createNativeStackNavigator<ParamListReport>();
function ReportNavigator () {
    const {user, setUser} = useUser();
    const title = user?.role === 'guru'?'Reports' : 'Report'
    return (
        <ReportStack.Navigator>
            <ReportStack.Screen name="Report" options={{title: `${title}` }} component={ReportScreen} />
            <ReportStack.Screen name="ReportDetail" component={ReportDetail} options={{title: 'Buat laporan'}}/>
            <ReportStack.Screen name="Soal" component={Soal} options={{title: 'Isi soal'}} />
        </ReportStack.Navigator>
    );
};

export default ReportNavigator;
