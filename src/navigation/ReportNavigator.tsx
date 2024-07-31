import * as React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ReportScreen from "../Screens/Main/ReportScreen.tsx";
import ReportDetail from "../Screens/Main/ReportDetail.tsx";
import Soal from "../Screens/Main/Soal.tsx";
import {ParamListReport} from "../Types";


const ReportStack = createNativeStackNavigator<ParamListReport>();
function ReportNavigator () {
    return (
        <ReportStack.Navigator>
            <ReportStack.Screen name="Report" component={ReportScreen} />
            <ReportStack.Screen name="ReportDetail" component={ReportDetail} options={{title: 'Buat laporan'}}/>
            <ReportStack.Screen name="Soal" component={Soal} options={{title: 'Isi soal'}} />
        </ReportStack.Navigator>
    );
};

export default ReportNavigator;
