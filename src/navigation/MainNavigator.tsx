import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, IconElement } from '@ui-kitten/components';
import HomeScreen from '../Screens/Main/HomeScreen';
import FeedbackScreen from '../Screens/Main/Feedback';
import ReportScreen from '../Screens/Main/ReportScreen';
import AccountScreen from '../Screens/Main/AccountScreen';
import {ParamListBase,ScreenProps} from '../Types'


const Tab = createBottomTabNavigator<ParamListBase>();

const MainNavigator: React.FC = () => {
  const renderIcon = (name: string) => ({ color, size }: { color: string; size: number }): IconElement => (
    <Icon name={name} width={size} height={size} fill={color} />
  );

  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }: ScreenProps<ParamListBase>) => ({
          tabBarIcon: ({ color, size }: { color: string; size: number }) => {
            let iconName: string = '';
            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Report':
                iconName = 'video-off';
                break;
              case 'Feedback':
                iconName = 'trending-up';
                break;
              case 'Account':
                iconName = 'person';
                break;
              default:
                iconName = 'home';
                break;
            }
            return renderIcon(iconName)({ color, size });
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Report" component={ReportScreen} />
        <Tab.Screen name="Feedback" component={FeedbackScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
  );
};

export default MainNavigator;
