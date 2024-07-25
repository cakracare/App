import React,{useState} from 'react';
import { Alert } from 'react-native';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import { NavigationProp, useNavigation} from '@react-navigation/native';
import {signInWithEmailAndPass, signInWithGoogle,} from '../../service/auth';
import {User} from '../../Types'
import {useId} from "../../helpers/IdContext.tsx";



const LoginScreen: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const navigation = useNavigation<NavigationProp<any>>();
    // @ts-ignore
    const {id, setId}=useId()
    const [user, setUser] = useState<User>({email:'',password: '',
        displayName: '',  asalSekolah: '',role: '',photoURL:'',kelas: ''});


    const handleLogin = async () => {
        const result = await signInWithEmailAndPass(email, pass);
        if (result.success) {
            // @ts-ignore
            setId(result.userid)
            navigation.navigate('MainNavigator', {
                screen: 'HomeScreen',
            })
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
        const result = await signInWithGoogle()
        if (result.success) {
            // @ts-ignore
            setId(result.userid)
            navigation.navigate('MainNavigator', {Screen: 'HomeScreen'})
            Alert.alert(result.message)
        } else {
            console.log(result.message);
            Alert.alert(result.message)
        }
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
