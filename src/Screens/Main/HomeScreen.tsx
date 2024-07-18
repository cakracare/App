import React from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';

const handleLogin = () => {
    auth()
  .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
}

const HomeScreen: React.FC = () => {
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text category='h1'>Home</Text>
            <Button onPress={handleLogin}>Login</Button>
        </Layout>
    )
};

export default HomeScreen