import React, {useEffect} from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {View} from 'react-native';
import styles from '../../style/AccountStyle.tsx';
import {HeaderAccount} from "../../components/HeaderAccount.tsx";
import {Logout} from "../../service/auth.tsx";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {useUser} from "../../helpers/userContext.tsx";




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
const renderItem2 = ({item, index}: {item: any; index: number})  => (
  <View>
    <InfoItem iconName="user" label="Nama" value={item.nama_lengkap} />
    <InfoItem iconName="envelope" label="Email" value={item.email} />
    <InfoItem iconName="key" label="Password" value={item.password} />
    <InfoItem iconName="transgender-alt" label="Gender" value={item.gender} />
    <InfoItem iconName="user-graduate" label="Kelas" value={item.kelas} />
    <InfoItem iconName="school" label="School" value={item.asal_sekolah} />
  </View>
);
const AccountScreen: React.FC = () => {
    const {user, setUser} = useUser()

    const navigation = useNavigation<NavigationProp<any>>();
    const handleLogout= async ()=>{
        const result = await Logout()
        if (result.success) {
            navigation.navigate('AuthNavigator',{Screen: 'LoginScreen'});
        }
    }

    useEffect(()=>{
        console.info(user, 'account screen')
    },[user])
  return (
    <Layout style={styles.container}>
        <HeaderAccount image={user?.photoURL} name={user?.nama_lengkap} email={user?.email}/>
      <View>
        <View style={styles.container4}>
          <Text style={styles.Text4}>Account Details</Text>
          <View style={styles.container5}>
            <Text style={styles.Text5}>edit</Text>
            <Icon2 name="angle-right" size={20} color={'black'} />
          </View>
        </View>
        {renderItem2({item: user, index: 0})}
        <Button onPress={handleLogout}>logut</Button>
      </View>

    </Layout>
  );
};

export default AccountScreen;
