import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {ScrollView, useColorScheme, View} from 'react-native';
import styles from '../../style/AccountStyle.tsx';
import {HeaderAccount} from '../../components/HeaderAccount.tsx';
import {Logout} from '../../service';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useUser} from '../../helpers/userContext.tsx';
import ButtonCompo from '../../components/ButtonCompo.tsx';

const InfoItem = ({
  iconName,
  label,
  value,
}: {
  iconName: string;
  label: string;
  value: string;
}) => {
  const securePasswordEntry = (value: string) => {
    return value && value.replace(/./g, '*');
  };
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? 'white' : 'black';
  return (
    <View style={styles.container3}>
      <Icon2 name={iconName} size={20} color={iconColor} style={styles.icon} />
      <Text style={styles.Text2}>{label}</Text>
      <Text style={styles.Text3}>
        {label == 'Password' ? securePasswordEntry(value) : value}
      </Text>
    </View>
  );
};

const renderItem2 = ({item, index}: {item: any; index: number}) => (
  <View>
    <InfoItem iconName="user" label="Nama" value={item?.nama_lengkap} />
    <InfoItem iconName="envelope" label="Email" value={item?.email} />
    <InfoItem iconName="key" label="Password" value={item?.password} />
    <InfoItem iconName="transgender-alt" label="Gender" value={item?.gender === 'male'?'laki - laki':'perempuan'} />
    <InfoItem iconName="user-graduate" label="Kelas" value={item?.kelas} />
    <InfoItem iconName="school" label="School" value={item?.asal_sekolah} />
    <InfoItem iconName="user-cog" label="Status" value={item?.role} />
    <InfoItem
      iconName="home"
      label="Alamat rumah"
      value={item?.alamat_lengkap}
    />
      <InfoItem
          iconName="address-book"
          label="Nomor wali murid"
          value={item?.no_ortu}
      />
  </View>
);
const AccountScreen: React.FC = () => {
  const {user, setUser} = useUser();
  const navigation = useNavigation<NavigationProp<any>>();
  const handleLogout = async () => {
    const result = await Logout();
    if (result.success) {
      navigation.navigate('AuthNavigator', {Screen: 'LoginScreen'});
    }
  };
  // console.log(user)

  return (
    <Layout style={styles.container}>
      <ScrollView>
        <HeaderAccount
          image={user?.photoURL}
          name={user?.nama_lengkap}
          email={user?.email}
        />
        <View>
          <View style={styles.container4}>
            <Text style={styles.Text4}>Account Details</Text>
          </View>
          {renderItem2({item: user, index: 0})}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginTop: 20,
            }}>
            <ButtonCompo
              status="success"
              text="edit"
              width={150}
              onPress={() =>
                navigation.navigate('AccountNavigator', {
                  screen: 'EditProfil',
                  params: {user: user},
                })
              }
            />
            <ButtonCompo
              status="danger"
              text="Logout"
              width={150}
              onPress={handleLogout}
            />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default AccountScreen;
