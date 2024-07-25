import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, IconElement} from '@ui-kitten/components';
import HomeScreen from '../Screens/Main/HomeScreen';
import FeedbackScreen from '../Screens/Main/Feedback';
import ReportScreen from '../Screens/Main/ReportScreen';
import AccountScreen from '../Screens/Main/AccountScreen';
import ReportDetail from '../Screens/Main/ReportDetail';
import {ParamListBase, ScreenProps} from '../Types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Tab = createBottomTabNavigator<ParamListBase>();
const Stack = createNativeStackNavigator();
function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={SecondNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Add Report" component={ReportDetail} />
    </Stack.Navigator>
  );
}
  
function SecondNavigator() {
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
            case 'Report':
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
      <Tab.Screen name="Report" component={ReportScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default MainNavigator;
