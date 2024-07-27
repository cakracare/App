
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import {checkIfUserIsLoggedIn} from '../helpers/checkIfUserIsLoggedIn.tsx';

import {View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const AppNavigator: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<Object | null>(null);
  // const {id,setId}=useId()

  useEffect(() => {
    const checkAuthStatus = async () => {
      const authStatus = await checkIfUserIsLoggedIn();
      setIsLoggedIn(authStatus.loggedIn);
      setUser(authStatus.user);
    };

    checkAuthStatus();
    // const uid = user?.uid || ''
    // setId(uid.toString())
  }, []);

  if (isLoggedIn === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading ges</Text>
      </View>
/*
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import { checkIfUserIsLoggedIn } from '../helpers/checkIfUserIsLoggedIn';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { Text } from '@ui-kitten/components';
const Stack = createStackNavigator();
const AppNavigator: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const authStatus = await checkIfUserIsLoggedIn();
            setIsLoggedIn(authStatus.loggedIn);
        };

        checkAuthStatus();
    }, []);

    if (isLoggedIn === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading ges</Text>
            </View>
        );
    }
    const iniRout = isLoggedIn ? "MainNavigator":"AuthNavigator"
    console.log(iniRout)

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={iniRout} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
                <Stack.Screen name="MainNavigator" component={MainNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
*/
    );
  }
  const iniRout = isLoggedIn ? 'MainNavigator' : 'AuthNavigator';
  console.log(iniRout)
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={iniRout}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        <Stack.Screen name="MainNavigator" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
