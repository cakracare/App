import React,{useState} from 'react';
import {Button, IconProps, Input, Layout, Text, Icon, Modal, Spinner} from '@ui-kitten/components';
import {Alert, Image,TouchableOpacity} from 'react-native';
import { NavigationProp, useNavigation} from '@react-navigation/native';
import {signInWithEmailAndPass, signInWithGoogle,} from '../../service';
import {useUser} from "../../helpers/userContext.tsx";
import styles from '../../style/LoginStyle.tsx';
import ButtonCompo from '../../components/ButtonCompo.tsx';

export default function LoginScreen():React.ReactElement {
      const navigation = useNavigation<NavigationProp<any>>();
      const [passwordVisible, setPasswordVisible] = useState(false);
      const [email, setEmail] = useState('');
      const [pass, setPass] = useState('');
      const {user, setUser} = useUser()
      const [loading, setLoading] = useState(false);

      const renderPasswordIcon = (props: IconProps) => (
        <Icon
          {...props}
          name={passwordVisible ? 'eye' : 'eye-off'}
          onPress={() => setPasswordVisible(!passwordVisible)}
        />
      );

      const handleLogin = async () => {
            setLoading(true);
            const result = await signInWithEmailAndPass(email, pass);
            if (result.success) {
                setUser(result.user)
                setLoading(false);
                navigation.navigate('MainNavigator', {Screen: 'HomeScreen'})
                Alert.alert(result.message)
            } else {
                Alert.alert(result.message)
                setPass('')
                setEmail('')
            }
        };

   const handleRegister= ()=>{
        navigation.navigate('Register')
    }

   const handleLoginWithGoogle= async ()=>{
       setLoading(true);
       signInWithGoogle().then((result)=>{
           if (result.success) {
               console.info(result, '<< login screen')
               setUser(result.user)
               navigation.navigate('MainNavigator', {Screen: 'HomeScreen'})
               Alert.alert(result.message)
           }else{
               Alert.alert(result.message)
           }
           setLoading(false);
       })

   }


  return (
    <Layout style={styles.container}>
      <Modal
        visible={loading}
        animationType="fade"
        backdropStyle={styles.backdrop}>
          <Spinner size="giant" status="primary" />
      </Modal>

      <Image source={require('../../assets/img/logo.png')} />
      <Layout>
        <Input
          placeholder="Enter your email"
          style={styles.input}
          value={email}
          onChangeText={nextValue => setEmail(nextValue)}
        />
        <Input
          placeholder="Enter your password"
          accessoryRight={renderPasswordIcon}
          secureTextEntry={!passwordVisible}
          style={styles.input}
          value={pass}
          onChangeText={nextValue => setPass(nextValue)}
        />
        <Text
          style={{
            paddingVertical: 10,
          }}>
          Minimum 8 charakter
        </Text>
        <ButtonCompo
            status="primary" text="Login" onPress={handleLogin} />
        <Layout style={styles.container1}>
          <TouchableOpacity onPress={handleRegister}>
            <Text
              style={{
                paddingVertical: 10,
              }}>
              Create Account
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              paddingVertical: 10,
            }}>
            or
          </Text>
          <Text
            style={{
              paddingVertical: 10,
            }}>
            Reset Password
          </Text>
        </Layout>
        <Button
          onPress={handleLoginWithGoogle}
          style={styles.touch}
          status="basic"
          accessoryLeft={
            <Image
              source={require('../../assets/img/google.png')}
              style={{
                width: 20,
                height: 20,
                marginRight: 10,
              }}
            />
          }>
          <Text>Sign In with Google</Text>
        </Button>
      </Layout>
    </Layout>
  );
}
