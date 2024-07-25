import React, {useEffect} from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';
import { Logout} from '../../service/auth';
import { NavigationProp, useNavigation} from '@react-navigation/native';
import {useId} from "../../helpers/IdContext.tsx";
import {getUser} from "../../service/user.ts";
import {User} from "../../Types";



const HomeScreen: React.FC = () => {

    const [user, setUser] = React.useState<User | null>(null);
    const {id} = useId()
    console.log(id)


    const navigation = useNavigation<NavigationProp<any>>();
    const handleLogout = async () => {
        const a = await Logout()

        if (a.success) {
            navigation.navigate('AuthNavigator',{Screen: 'LoginScreen'});
        }
    }

    useEffect(()=>{
        if (id != null) {
            getUser(id).then((user)=>{
                // @ts-ignore
                setUser(user.data)
            })
        }
    },[id])
    // @ts-ignore

    const name = user?.displayName || ''
    console.log(name, 'sfdsdf')
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text category='h1'>Home </Text>
            <Text style={{ marginBottom: 10 }}>selamat datang {name}</Text>
            <Button onPress={handleLogout}>Logout</Button>
        </Layout>
    )
};

export default HomeScreen