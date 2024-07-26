import {useNavigation} from '@react-navigation/native';
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
  const navigation = useNavigation();
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
