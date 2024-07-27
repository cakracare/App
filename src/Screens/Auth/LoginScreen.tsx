import React,{useState} from 'react';
import {Button, IconProps, Input, Layout, Text} from '@ui-kitten/components';
import {Alert, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationProp, useNavigation} from '@react-navigation/native';
import {Logout, signInWithEmailAndPass, signInWithGoogle,} from '../../service/auth';

export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
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
        const result = await  signInWithEmailAndPass(email, pass);
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
        const a = await signInWithGoogle()
        navigation.navigate('MainNavigator', {Screen: 'Home'})
    }

    const handleLogout = async ()=>{
       await Logout()
        console.log('sdfdsf')
    }


  return (
    <Layout
      style={{
        flex: 1,
        alignItems: 'center',
        padding: 50,
        backgroundColor: '#FFFFFF',
      }}>
      <Image source={require('../../assets/img/logo.png')} />
      <Layout>
        <Input
          placeholder="Enter your email"
          style={{marginTop: 20, borderRadius: 10, backgroundColor: '#EEEDEB'}}
          value={email}
          onChangeText={nextValue => setEmail(nextValue)}
        />
        <Input
          placeholder="Enter your password"
          accessoryRight={renderPasswordIcon}
          secureTextEntry={!passwordVisible}
          style={{marginTop: 20, borderRadius: 10, backgroundColor: '#EEEDEB'}}
          value={pass}
          onChangeText={nextValue => setPass(nextValue)}
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
          onPress={handleLogin} >
          Log In
        </Button>
        <Layout
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
            marginTop: 10,
          }}>
          <TouchableOpacity
            onPress={handleRegister}>
            <Text>Create Account</Text>
          </TouchableOpacity>
          <Text>or</Text>
          <Text>Reset Password</Text>
        </Layout>
        <TouchableOpacity onPress={handleLoginWithGoogle}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            backgroundColor: '#EEEDEB',
          }}>
          <Image
            source={require('../../assets/img/google.png')}
            style={{
              width: 20,
              height: 20,
              marginRight: 10,
            }}
          />
          <Text>Sign In with Google</Text>
        </TouchableOpacity>
      </Layout>
        <Button onPress={handleLogout} >test</Button>
    </Layout>
  );
}