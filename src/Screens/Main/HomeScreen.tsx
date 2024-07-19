import React from 'react';
import { Button, Layout, Text, List, ListItem } from '@ui-kitten/components';
import { Logout, SignInWithEmailAndPassword, SignUpWithEmailAndPassword } from '../../service/auth';
import { NavigationProp, useNavigation, CommonActions } from '@react-navigation/native';





const HomeScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<any>>();

    const handleLogin = async () => {
        const a = await SignInWithEmailAndPassword('gggggxffgdfgdfgdfgfdgdxfgdbxcbcxaufal1234565@gmail.com', '12345678')
        console.log(a)

    }

    const handleLogout = async () => {
        const a = await Logout()
        console.log(a.message)
        if (a.success) {
            // Redirect to the Login screen
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }], // Pastikan 'Login' sesuai dengan nama rute di AuthNavigator
            });
        }


    }


    const handleRegister = async () => {
        const dat = {
            nama: "aufadfgdfgfdgfdgl",
            kelas: "Ttt"
        }
        const data = await SignUpWithEmailAndPassword('gggggxffgdfgdfgdfgfdgdxfgdbxcbcxaufal1234565@gmail.com', '12345678', '12345678', dat)
        console.log(data)
    }

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text category='h1'>Home</Text>
            <Button onPress={handleLogin}>Login</Button>
            <Button onPress={handleRegister}>Register</Button>
            <Button onPress={handleLogout}>Logout</Button>
        </Layout>
    )
};

export default HomeScreen