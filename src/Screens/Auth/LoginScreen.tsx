import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import { NavigationProp, useNavigation} from '@react-navigation/native';
import {onGoogleButtonPress, SignInWithEmailAndPassword} from '../../service/auth';



const LoginScreen: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const navigation = useNavigation<NavigationProp<any>>();


    const handleLogin = async () => {
        const result = await SignInWithEmailAndPassword(email, pass);

        if (result.success) {
            navigation.navigate('MainNavigator', {Screen: 'HomeScreen'})
            Alert.alert(result.message)
        } else {
            console.log(result.message);
            Alert.alert(result.message)
        }
    };

    const handleRegister= ()=>{
        navigation.navigate('Register')
    }

    const handleLoginWithGoogle= async ()=>{
        const a = await onGoogleButtonPress()
        console.log('login with google nih boss',a.user.displayName)
    }

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} level='2'>
            <Text style={{ marginBottom: 20 }} category='h1'>Login</Text>
            <Input
                placeholder='Email'
                value={email}
                onChangeText={nextValue => setEmail(nextValue)}
                style={{ width: 300, marginBottom: 10 }}
            />
            <Input
                placeholder='Password'
                value={pass}
                onChangeText={nextValue => setPass(nextValue)}
                style={{ width: 300 , marginBottom: 10}}
                secureTextEntry
            />
            <Button onPress={handleLogin} style={{ width: 300 , marginBottom: 10}} >Login</Button>
            <Button onPress={handleRegister} style={{ width: 300 , marginBottom: 10}} >Register</Button>
            <Button onPress={handleLoginWithGoogle} style={{ width: 300 , marginBottom: 10}} >Google</Button>
        </Layout>
    );
};


export default LoginScreen;
