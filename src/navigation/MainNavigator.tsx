import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, IconElement} from '@ui-kitten/components';
import HomeScreen from '../Screens/Main/HomeScreen';
import AccountScreen from '../Screens/Main/AccountScreen';
import {ParamListBase, ScreenProps} from '../Types';
import ReportNavigator from "./ReportNavigator.tsx";
import {Route, getFocusedRouteNameFromRoute} from "@react-navigation/native";
const Tab = createBottomTabNavigator<ParamListBase>();

// function SecondNavigator() {
function MainNavigator() {
    function getTabBarVisibility(route: Partial<Route<string>>) {
        const routeName = getFocusedRouteNameFromRoute(route) ?? '';

        if (routeName === 'ReportDetail' || routeName === 'Soal') {
            return 'none';
        }
        return 'flex';
    }
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
              iconName = 'video-off';
              break;
            case 'Account':
              iconName = 'person';
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
          title: 'Cakra Care',
          headerStyle: {backgroundColor: '#00B2FF'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen name="ReportNavigator" options={{headerShown:false}} component={ReportNavigator} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default MainNavigator;
