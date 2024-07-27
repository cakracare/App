import {Button, IconProps, Input, Layout, Text} from '@ui-kitten/components';
import {useState} from 'react';
import {
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  onGoogleButtonPress,
  SignInWithEmailAndPassword,
} from '../../service/auth';

export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const renderPasswordIcon = (props: IconProps) => (
    <Icon
      {...props}
      name={passwordVisible ? 'eye-off' : 'eye'}
      fill="black"
      onPress={() => setPasswordVisible(!passwordVisible)}
    />
  );

  const navigation = useNavigation<NavigationProp<any>>();

  const handleLogin = async () => {
    const result = await SignInWithEmailAndPassword(email, pass);

    if (result.success) {
      navigation.navigate('MainNavigator', {Screen: 'HomeScreen'});
      Alert.alert(result.message);
    } else {
      console.log(result.message);
      Alert.alert(result.message);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleLoginWithGoogle = async () => {
    const a = await onGoogleButtonPress();
    console.log('login with google nih boss', a.user.displayName);
  };

  return (
    <Layout
      style={{
        flex: 1,
        alignItems: 'center',
        padding: 50,
        backgroundColor: '#FFFFFF',
      }}>
      <Image source={require('../../Image/logo.png')} />
      <View>
        <Input
          placeholder="Enter your email"
          style={{marginTop: 20, borderRadius: 10, backgroundColor: '#EEEDEB'}}
        />
        <Input
          placeholder="Enter your password"
          accessoryRight={renderPasswordIcon}
          secureTextEntry={!passwordVisible}
          style={{marginTop: 20, borderRadius: 10, backgroundColor: '#EEEDEB'}}
        />
        <Text>Minimum 8 charakter</Text>
        <Button
          style={{
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: '#3B6EA8',
            width: 300,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.navigate('MainNavigator' as never);
          }}>
          Log In
        </Button>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
            marginTop: 10,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register' as never)}>
            <Text>Create Account</Text>
          </TouchableOpacity>
          <Text>or</Text>
          <Text>Reset Password</Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            backgroundColor: '#EEEDEB',
          }}>
          <Image
            source={require('../../Image/google.png')}
            style={{
              width: 20,
              height: 20,
              marginRight: 10,
            }}
          />
          <Text>Sign In with Google</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}
/*
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
*/
