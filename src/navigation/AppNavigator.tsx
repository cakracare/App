import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import { checkIfUserIsLoggedIn } from '../helpers/checkIfUserIsLoggedIn'; // Assuming you have the function implemented
import { View,ActivityIndicator } from 'react-native';

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
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};

export default AppNavigator;
