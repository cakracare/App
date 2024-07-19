import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import { NavigationProp, useNavigation,CommonActions } from '@react-navigation/native';
import { SignInWithEmailAndPassword } from '../../service/auth';


const LoginScreen: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const navigation = useNavigation<NavigationProp<any>>();

    const handleLogin = async () => {
        const result = await SignInWithEmailAndPassword(email, pass);

        if (result.success) {
            // Navigate to Home screen on successful login
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainNavigator', state: { routes: [{ name: 'Home' }] } }],
            });
        } else {
            // Handle login failure (e.g., show an error message)
            console.log(result.message);
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
                placeholder='Password'
                value={pass}
                onChangeText={nextValue => setPass(nextValue)}
                style={{ width: 300 , marginBottom: 10}}
                secureTextEntry
            />
            <Button onPress={handleLogin}>Login</Button>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        margin: 2,
    },
});

export default LoginScreen;
