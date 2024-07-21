import React from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';
import { Logout, SignUpWithEmailAndPassword } from '../../service/auth';
import { NavigationProp, useNavigation,CommonActions } from '@react-navigation/native';





const HomeScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<any>>();

    const handleLogout = async () => {
        const a = await Logout()
        console.log(a.message)
        if (a.success) {
            navigation.navigate('AuthNavigator',{Screen: 'LoginScreen'});
        }
        

    }


    const handleRegister = async () => {
        const dat = {
            nama: "aufadfgdfgfdgfdgl",
            kelas: "Ttt"
        }
        const data = await SignUpWithEmailAndPassword('aufal1234565@gmail.com', '12345678', '12345678', dat)
        console.log(data)
    }

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text category='h1'>Home</Text>
            <Button onPress={handleRegister}>Register</Button>
            <Button onPress={handleLogout}>Logout</Button>
        </Layout>
    )
};

export default HomeScreen