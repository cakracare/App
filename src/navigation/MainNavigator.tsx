import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, IconElement} from '@ui-kitten/components';
import HomeScreen from '../Screens/Main/HomeScreen';
import AccountScreen from '../Screens/Main/AccountScreen';
import {ParamListBase, ScreenProps} from '../Types';
/*
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ReportDetail} from '../Screens/Main/ReportDetail.tsx';
import Soal from '../Screens/Main/Soal.tsx';
import HasilReport from '../Screens/Main/HasilReport.tsx';
*/

import HasilReport from '../Screens/Main/HasilReport.tsx';
import ReportNavigator from "./ReportNavigator.tsx";
import {Route, getFocusedRouteNameFromRoute} from "@react-navigation/native";
import ReportDetail from "../Screens/Main/ReportDetail.tsx";
import {useUser} from "../helpers/userContext.tsx";
const Tab = createBottomTabNavigator<ParamListBase>();

// function SecondNavigator() {
function MainNavigator() {
  function getTabBarVisibility(route: Partial<Route<string>>) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';

        if (routeName === 'ReportDetail' || routeName === 'Soal' || routeName === 'HasilReport') {
            return 'none';
        }
        return 'flex';
    }

    const {user,setUser} = useUser()
  const renderIcon =
    (name: string) =>
    ({color, size}: {color: string; size: number}): IconElement =>
      <Icon name={name} width={size} height={size} fill={color} />;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}: ScreenProps<ParamListBase>) => ({
        tabBarIcon: ({color, size}: {color: string; size: number}) => {
          let iconName: string = '';
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'ReportNavigator':
              iconName = user?.role === 'siswa'? 'video-off' : 'archive';
              break;
            case 'Account':
              iconName = 'person';
              break;
            case 'HasilReport':
              iconName = 'archive';
              break;
            default:
              iconName = 'home';
              break;
          }
          return renderIcon(iconName)({color, size});
        },
        tabBarStyle: {display: getTabBarVisibility(route)},
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Cakra care',
          tabBarLabel: 'Home',
          headerStyle: {backgroundColor: '#00B2FF'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />


        <Tab.Screen name="ReportNavigator" options={{headerShown:false,title: user?.role === 'guru'? 'Feedback' : 'report' }} component={ReportNavigator}/>
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default MainNavigator;
