import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import { NavigationProp, useNavigation} from '@react-navigation/native';
import { SignUpWithEmailAndPassword} from '../../service/auth';
import {User} from "../../Types";
import {validateUser} from "../../helpers/validateUser.ts";



const RegisterScreen: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [pass_c, setPass_c] = React.useState('');
    const [role, setRole] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [photourl, setPhotourl] = React.useState('');
    const [asalSekolah, setAsalSekolah] = React.useState('');
    const [kelas, setKelas] = React.useState('');
    const navigation = useNavigation<NavigationProp<any>>();

    const newUser:User = {
        email: email,
        password: pass,
        displayName: username,
        photoURL: photourl,
        asalSekolah: asalSekolah,
        kelas: kelas,
        role:role,
    }

    const handleRegister = async () => {

        const isValid = validateUser(newUser)
        if (!isValid.success) {
            Alert.alert(isValid.error[0].message)
            return;
        }

        const result = await SignUpWithEmailAndPassword(newUser, pass_c)
        if (result.success) {

            navigation.navigate('MainNavigator', {Screen: 'HomeScreen'})
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
            <Input
                placeholder='kelas'
                value={kelas}
                onChangeText={nextValue => setKelas(nextValue)}
                style={{ width: 300 , marginBottom: 10}}
            />
            <Input
                placeholder='asal sekolah'
                value={asalSekolah}
                onChangeText={nextValue => setAsalSekolah(nextValue)}
                style={{ width: 300 , marginBottom: 10}}

            />
            <Button onPress={handleRegister}>Register</Button>
        </Layout>
    );
};


export default RegisterScreen;
