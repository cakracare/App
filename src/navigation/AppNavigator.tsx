import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import { checkIfUserIsLoggedIn } from '../helpers/checkIfUserIsLoggedIn.ts';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { Text } from '@ui-kitten/components';
import {IdProvider, useId} from "../helpers/IdContext.tsx";
const Stack = createStackNavigator();
const AppNavigator: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [user, setUser] = useState<Object | null>(null);
    const {id,setId}=useId()

    useEffect(() => {
        const checkAuthStatus = async () => {
            const authStatus = await checkIfUserIsLoggedIn();
            setIsLoggedIn(authStatus.loggedIn);
            setUser(authStatus.user);

        };


        const uid = user?.uid || ''
        setId(uid.toString())

        checkAuthStatus();
    }, [user]);

    if (isLoggedIn === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading ges</Text>
            </View>
        );
    }
    const iniRout = isLoggedIn ? "MainNavigator":"AuthNavigator"



    return (
        // <IdProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={iniRout} screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
                    <Stack.Screen name="MainNavigator" component={MainNavigator} />
                </Stack.Navigator>
            </NavigationContainer>
        // </IdProvider>
    );
};

export default AppNavigator;
