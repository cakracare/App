
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import {checkIfUserIsLoggedIn} from '../helpers/checkIfUserIsLoggedIn.ts';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {useId} from "../helpers/IdContext.tsx";
import {getUserId} from "../service/user.ts";





const Stack = createNativeStackNavigator();
const AppNavigator: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  // const [user, setUser] = useState<Object | null>(null);
  // const { id, setId } = useId();


  useEffect(() => {
    const checkAuthStatus = async () => {
      const authStatus = await checkIfUserIsLoggedIn();
      setIsLoggedIn(authStatus.loggedIn);
      // setUser(authStatus.user);
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
    );
  }
  const iniRout = isLoggedIn ? 'MainNavigator' : 'AuthNavigator';
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
