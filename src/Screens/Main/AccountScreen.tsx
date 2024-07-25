import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import styles from '../../style/AccountStyle.tsx';
const data = [
  {
    id: 1,
    name: 'Aziz',
    image: 'https://via.placeholder.com/150',
    email: 'hahahah@gmail.com',
  },
];
const renderItem = ({item, index}: {item: any; index: number}) => (
  <View style={styles.container1}>
    <Image source={{uri: item.image}} style={styles.Image} />
    <View style={styles.container2}>
      <Text style={styles.Text}>{item.name}</Text>
      <Text>{item.email}</Text>
    </View>
  </View>
);

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
  return (
    <Layout style={styles.container}>
      <View>{renderItem({item: data[0], index: 0})}</View>
      <View>
        <View style={styles.container4}>
          <Text style={styles.Text4}>Account Details</Text>
          <View style={styles.container5}>
            <Text style={styles.Text5}>edit</Text>
            <Icon2 name="angle-right" size={20} color={'black'} />
          </View>
        </View>
        {renderItem2({item: data2[0], index: 0})}
      </View>
    </Layout>
  );
};

export default AccountScreen;
