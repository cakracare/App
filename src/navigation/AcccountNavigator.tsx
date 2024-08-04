import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ParamListAccount} from '../Types';
import EditProfile from '../Screens/Main/EditProfil.tsx';
import AccountScreen from "../Screens/Main/AccountScreen.tsx";

const AccountStack = createNativeStackNavigator<ParamListAccount>();
function AccountNavigator() {
    return (
        <AccountStack.Navigator>
            <AccountStack.Screen name="Account" component={AccountScreen} />
            <AccountStack.Screen name={'EditProfil'} options={{title:'Edit Account'}} component={EditProfile} />
        </AccountStack.Navigator>
    );
}

export default AccountNavigator;
