import React, {useState} from 'react';
import {
    Button,
    IconProps,
    Input,
    Layout,
    Text,
    Icon,
    Modal,
    Spinner, Card,
} from '@ui-kitten/components';
import {Alert, Image, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {sendPasswordResetEmail, signInWithEmailAndPass, signInWithGoogle} from '../../service';
import {useUser} from '../../helpers/userContext.tsx';
import styles from '../../style/LoginStyle.tsx';
import ButtonCompo from '../../components/ButtonCompo.tsx';

export default function LoginScreen(): React.ReactElement {
  const navigation = useNavigation<NavigationProp<any>>();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const {user, setUser} = useUser();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
    const [emailReset, setEmailReset] = useState('');

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
      setUser(result.user);
      setLoading(false);
      navigation.navigate('MainNavigator', {Screen: 'HomeScreen'});
      ToastAndroid.show(result.message, ToastAndroid.SHORT);
      setPass('');
      setEmail('');
    } else {
      ToastAndroid.show(result.message, ToastAndroid.SHORT);
      setLoading(false);
      setPass('');
      setEmail('');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleLoginWithGoogle = async () => {
    setLoading(true);
    signInWithGoogle().then(result => {
       console.info(result, '<< login screen');
       setUser(result.user);
       setLoading(false);
       navigation.navigate('MainNavigator', {Screen: 'HomeScreen'});
       ToastAndroid.show(result.message, ToastAndroid.SHORT);
    }).catch((err)=>{
        setLoading(false);
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
    });
  };

  const handleResetPassword = async ()=>{
      setVisible(true)
  }

  const sendMessageReset = async ()=>{
      const result = await sendPasswordResetEmail(emailReset)
      if (result.success) {
          setVisible(false)
          Alert.alert(result.message, 'silahkan check email anda !!')
      }

      if (!result.success) {
          setVisible(false)
          Alert.alert(result.message)
      }

  }

  return (
    <Layout style={styles.container}>
      <Modal
        visible={loading}
        animationType="fade"
        backdropStyle={styles.backdrop}>
        <Spinner size="giant" status="primary" />
      </Modal>
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}
        >
            <Card disabled={true}>
                <Input
                    placeholder="Enter your email"
                    style={styles.input}
                    value={emailReset}
                    onChangeText={nextValue => setEmailReset(nextValue)}
                />
                <Button onPress={sendMessageReset} style={{width:'100%', marginTop: 10}}>
                    Send reset password
                </Button>
            </Card>
        </Modal>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 20,
        }}>
        <Image
          source={require('../../assets/img/logo1.png')}
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
          }}
        />
        <Image
          source={require('../../assets/img/logo.png')}
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
          }}
        />
        <Image
          source={require('../../assets/img/logo2.png')}
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
          }}
        />
      </View>
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
          width={300}
          status="primary"
          text="Login"
          disabled={email === '' || pass === ''}
          onPress={handleLogin}
        />
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
            <TouchableOpacity onPress={handleResetPassword}>
                <Text
                    style={{
                        paddingVertical: 10,
                    }}>
                    Reset Password
                </Text>
            </TouchableOpacity>
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
