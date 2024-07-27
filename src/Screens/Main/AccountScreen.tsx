import React, {useEffect} from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import styles from '../../style/AccountStyle.tsx';
import {useId} from "../../helpers/IdContext.tsx";
import {getUser} from "../../service/user.ts";
import {User} from "../../Types";
import {HeaderAccount} from "../../components/HeaderAccount.tsx";
import {Logout} from "../../service/auth.tsx";
import {NavigationProp, useNavigation} from "@react-navigation/native";


const data2 = [
  {
    id: 1,
    nama: 'Aziz',
    email: 'hahahahh@gmail.com',
    password: '123 456 789',
    gender: 'male',
    kelas: 'XII RPL 1',
    sekolah: 'SMK Negeri 1 Surabaya',
  },
];
const InfoItem = ({
  iconName,
  label,
  value,
}: {
  iconName: string;
  label: string;
  value: string;
}) => (
  <View style={styles.container3}>
    <Icon2 name={iconName} size={20} color={'black'} style={styles.icon} />
    <Text style={styles.Text2}>{label}</Text>
    <Text style={styles.Text3}>{value}</Text>
  </View>
);
const renderItem2 = ({item, index}: {item: any; index: number}) => (
  <View>
    <InfoItem iconName="user" label="Nama" value={item.nama} />
    <InfoItem iconName="envelope" label="Email" value={item.email} />
    <InfoItem iconName="key" label="Password" value={item.password} />
    <InfoItem iconName="transgender-alt" label="Gender" value={item.gender} />
    <InfoItem iconName="user-graduate" label="Kelas" value={item.kelas} />
    <InfoItem iconName="school" label="School" value={item.sekolah} />
  </View>
);
const AccountScreen: React.FC = () => {
    const [user, setUser] = React.useState<User | null>(null);
    const {id} = useId()
    const navigation = useNavigation<NavigationProp<any>>();
    const handleLogout= async ()=>{
        const a = await Logout()
        console.log(a.message)
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
  return (
    <Layout style={styles.container}>
        <HeaderAccount image={'https://miro.medium.com/v2/resize:fit:3398/format:webp/1*eTt34ujlYnjfM21cB0-ZaQ.png'}
                       name={'aufal'}
                       email={'aufalgantengbanget@gmail.com'}/>
      <View>
        <View style={styles.container4}>
          <Text style={styles.Text4}>Account Details</Text>
          <View style={styles.container5}>
            <Text style={styles.Text5}>edit</Text>
            <Icon2 name="angle-right" size={20} color={'black'} />
          </View>
        </View>
        {renderItem2({item: data2[0], index: 0})}
        <Button onPress={handleLogout}>logut</Button>
      </View>

    </Layout>
  );
};

export default AccountScreen;
