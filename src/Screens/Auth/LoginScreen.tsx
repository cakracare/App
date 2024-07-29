import React, {useState} from 'react';
import {
  Button,
  IconProps,
  Input,
  Layout,
  Text,
  Icon,
  Spinner,
  Modal,
} from '@ui-kitten/components';
import {Alert, Image, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {signInWithEmailAndPass, signInWithGoogle} from '../../service/auth';
import {getUser, getUserId} from '../../service/user.ts';
import {useId} from '../../helpers/IdContext.tsx';
import ButtonCompo from '../../components/ButtonCompo.tsx';
import styles from '../../style/LoginStyle.tsx';
import {set} from 'zod';

export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [loading, setLoading] = useState(false);
  const {id, setId} = useId();

  const userid = async () => {
    const userId = getUserId() || '';
    setId(userId);
  };

  const renderPasswordIcon = (props: IconProps) => (
    <Icon
      {...props}
      name={passwordVisible ? 'eye' : 'eye-off'}
      // fill="black"
      onPress={() => setPasswordVisible(!passwordVisible)}
    />
  );
  const navigation = useNavigation<NavigationProp<any>>();

  const handleLogin = async () => {
    const result = await signInWithEmailAndPass(email, pass);
    if (result.success) {
      await userid();
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
    setLoading(true);
    const result = await signInWithGoogle();
    setLoading(false);
    if (result.success) {
      await userid();
      const user = await getUser(result.userid || '');
      console.log(user.data);
      navigation.navigate('MainNavigator', {Screen: 'HomeScreen'});
      ToastAndroid.show(result.message, ToastAndroid.SHORT);
    } else {
      console.log(result.message);
      ToastAndroid.show(result.message, ToastAndroid.SHORT);
    }
  };

  return (
    <Layout style={styles.container}>
      <Modal
        visible={loading}
        animationType="fade"
        backdropStyle={styles.backdrop}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <Spinner size="large" status="primary" />
          </View>
        </View>
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
        <ButtonCompo status="primary" text="Login" onPress={handleLogin} />
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
