import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/Octicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {FlatList, Image, View} from 'react-native';
const data = [
  {
    id: 1,
    name: 'Aziz',
    image: 'https://via.placeholder.com/150',
    email: 'hahahah@gmail.com',
  },
];
const renderItem = ({item, index}: {item: any; index: number}) => (
  <View
    style={{
      flexDirection: 'row',
      margin: 10,
    }}>
    <Image
      source={{uri: item.image}}
      style={{width: 100, height: 100, borderRadius: 50, margin: 10}}
    />
    <View
      style={{
        flexDirection: 'column',
        margin: 20,
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        {item.name}
      </Text>
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
const renderItem2 = ({item, index}: {item: any; index: number}) => (
  <View>
    <View
      style={{
        flexDirection: 'row',
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        padding: 10,
      }}>
      <Icon name="feed-person" size={30} color={'black'} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginStart: 20,
          marginEnd: 20,
          textAlignVertical: 'center',
        }}>
        Nama
      </Text>
      <Text
        style={{
          flex: 1,
          fontSize: 20,
          fontWeight: 'bold',
          marginEnd: 20,
          textAlign: 'right',
          textAlignVertical: 'center',
        }}>
        {item.nama}
      </Text>
    </View>
    <View
      style={{
        flexDirection: 'row',
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        padding: 10,
      }}>
      <Icon name="mail" size={30} color={'black'} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginStart: 20,
          marginEnd: 20,
          textAlignVertical: 'center',
        }}>
        Email
      </Text>
      <Text
        style={{
          flex: 1,
          fontSize: 20,
          fontWeight: 'bold',
          marginEnd: 20,
          textAlign: 'right',
          textAlignVertical: 'center',
        }}>
        {item.email}
      </Text>
    </View>
    <View
      style={{
        flexDirection: 'row',
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        padding: 10,
      }}>
      <Icon name="key" size={30} color={'black'} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginStart: 20,
          marginEnd: 20,
          textAlignVertical: 'center',
        }}>
        Password
      </Text>
      <Text
        style={{
          flex: 1,
          fontSize: 20,
          fontWeight: 'bold',
          marginEnd: 20,
          textAlign: 'right',
          textAlignVertical: 'center',
        }}>
        {item.password}
      </Text>
    </View>
    <View
      style={{
        flexDirection: 'row',
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        padding: 10,
      }}>
      <Icon1 name="gender-male" size={30} color={'black'} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginStart: 20,
          marginEnd: 20,
          textAlignVertical: 'center',
        }}>
        Gender
      </Text>
      <Text
        style={{
          flex: 1,
          fontSize: 20,
          fontWeight: 'bold',
          marginEnd: 20,
          textAlign: 'right',
          textAlignVertical: 'center',
        }}>
        {item.gender}
      </Text>
    </View>
    <View
      style={{
        flexDirection: 'row',
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        padding: 10,
      }}>
      <Icon2 name="graduation-cap" size={30} color={'black'} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginStart: 20,
          marginEnd: 20,
          textAlignVertical: 'center',
        }}>
        Kelas
      </Text>
      <Text
        style={{
          flex: 1,
          fontSize: 20,
          fontWeight: 'bold',
          marginEnd: 20,
          textAlign: 'right',
          textAlignVertical: 'center',
        }}>
        {item.kelas}
      </Text>
    </View>
    <View
      style={{
        flexDirection: 'row',
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        padding: 10,
      }}>
      <Icon2 name="school" size={30} color={'black'} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginStart: 20,
          marginEnd: 20,
          textAlignVertical: 'center',
        }}>
        School
      </Text>
      <Text
        style={{
          flex: 1,
          fontSize: 20,
          fontWeight: 'bold',
          marginEnd: 20,
          textAlign: 'right',
          textAlignVertical: 'center',
        }}>
        {item.sekolah}
      </Text>
    </View>
  </View>
);
const AccountScreen: React.FC = () => {
  return (
    <Layout style={{flex: 1}}>
      <View>{renderItem({item: data[0], index: 0})}</View>
      <View>
        <View
          style={{
            flexDirection: 'row',

            margin: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginStart: 10,
            }}>
            Account Details
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              flex: 1,
              borderRadius: 10,
              borderWidth: 1,
              marginStart: 170,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginEnd: 4,
              }}>
              edit
            </Text>
            <Icon2 name="angle-right" size={20} color={'black'} />
          </View>
        </View>
        {renderItem2({item: data2[0], index: 0})}
      </View>
    </Layout>
  );
};

export default AccountScreen;
