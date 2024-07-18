import React from 'react';
import { Layout, Text } from '@ui-kitten/components';

const AccountScreen: React.FC = () => {
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text category='h1'>Account</Text>
        </Layout>
    )
};

export default AccountScreen