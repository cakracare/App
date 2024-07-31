
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import {checkIfUserIsLoggedIn} from '../helpers/checkIfUserIsLoggedIn.ts';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useUser} from "../helpers/userContext.tsx";
import {getUser} from "../service/user.ts";
import auth from "@react-native-firebase/auth";

const Stack = createNativeStackNavigator();
const AppNavigator: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const {user, setUser} = useUser()

  useEffect(() => {
     checkIfUserIsLoggedIn().then((status)=>{
          setIsLoggedIn(status.loggedIn)
          getUser(status.user?.uid).then((result)=>{
            setUser(result?.data)
          })
      })
  }, []);

  if (isLoggedIn === null) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading ges</Text>
        </View>
    );
  }

  const iniRout = isLoggedIn ? 'MainNavigator' : 'AuthNavigator';
  console.info(isLoggedIn,'<< App navigator')
  return (
      <NavigationContainer>
        <Stack.Navigator
            initialRouteName={iniRout}
            screenOptions={{headerShown: false}}>
          <Stack.Screen name="MainNavigator" component={MainNavigator} />
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default AppNavigator;
