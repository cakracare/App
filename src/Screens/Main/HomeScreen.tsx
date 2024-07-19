import React from 'react';
import { Button, Layout, Text,List, ListItem  } from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';

const handleLogin = () => {
    console.log('kepencet')
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