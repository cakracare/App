import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import { NavigationProp, useNavigation} from '@react-navigation/native';
import { SignUpWithEmailAndPassword} from '../../service/auth';



const RegisterScreen: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [pass_c, setPass_c] = React.useState('');
    const [role, setRole] = React.useState('');
    const [username, setUsername] = React.useState('');
    const navigation = useNavigation<NavigationProp<any>>();

    const additionalData = {
        username,
        role
    }

    const handleRegister = async () => {
        const result = await SignUpWithEmailAndPassword(email,pass,pass_c,additionalData)

        if (result.success) {
            navigation.navigate('Login')
            Alert.alert(result.message)
        } else {
            console.log(result.message);
            Alert.alert(result.message)
        }
    };

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
                placeholder='Username'
                value={username}
                onChangeText={nextValue => setUsername(nextValue)}
                style={{ width: 300, marginBottom: 10 }}
            />
            <Input
                placeholder='Password'
                value={pass}
                onChangeText={nextValue => setPass(nextValue)}
                style={{ width: 300 , marginBottom: 10}}
                secureTextEntry
            />
            <Input
                placeholder='Password confir'
                value={pass_c}
                onChangeText={nextValue => setPass_c(nextValue)}
                style={{ width: 300 , marginBottom: 10}}
                secureTextEntry
            />
            <Input
                placeholder='role'
                value={role}
                onChangeText={nextValue => setRole(nextValue)}
                style={{ width: 300 , marginBottom: 10}}
              
            />
            <Button onPress={handleRegister}>Register</Button>
        </Layout>
    );
};


export default RegisterScreen;
