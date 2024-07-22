import React from 'react';
import {
  Button,
  Layout,
  Text,
  List,
  ListItem,
  Card,
} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/AntDesign';
import {FlatList, Image, ScrollView, View} from 'react-native';
import auth from '@react-native-firebase/auth';

const handleLogin = () => {
  console.log('kepencet');
};
const data = [
  {
    title: 'Bullying',
    description:
      'Learn about the different types of bullying and its impact on individuals.',
    image:
      'https://emojiguide.com/wp-content/uploads/platform/google/44140.png',
  },
  {
    title: 'Bullying',
    description:
      'Learn about the different types of bullying and its impact on individuals.',
    image:
      'https://emojiguide.com/wp-content/uploads/platform/google/44140.png',
  },
];
const renderItem = ({item, index}: {item: any; index: number}) => (
  <Card
    style={{
      width: 'auto',
      height: 'auto',
    }}>
    <View style={{flexDirection: 'row'}}>
      <Image source={{uri: item.image}} style={{width: 100, height: 100}} />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          marginStart: 10,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
          }}>
          {item.title}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            color: 'black',
            fontSize: 15,
            marginEnd: 50,
          }}>
          {item.description}
        </Text>
        <Image
          source={{
            uri: 'https://emojiguide.com/wp-content/uploads/platform/google/44140.png',
          }}
          style={{width: 30, height: 30}}
        />
      </View>
    </View>
  </Card>
);
const data2 = [
  {
    id: 1,
    duration: '10 Minutes',
    title: 'Video 1',
    image: 'https://via.placeholder.com/150',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 2,
    title: 'Video 2',
    duration: '10 Minutes',
    image: 'https://via.placeholder.com/150',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 3,
    title: 'Video 3',
    duration: '10 Minutes',
    image: 'https://via.placeholder.com/150',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 4,
    title: 'Video 4',
    duration: '10 Minutes',
    image: 'https://via.placeholder.com/150',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 5,
    title: 'Video 5',
    duration: '10 Minutes',
    image: 'https://via.placeholder.com/150',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
];
const renderItem2 = ({item, index}: {item: any; index: number}) => (
  <View
    style={{
      width: 'auto',
      height: 'auto',
      borderRadius: 5,
      backgroundColor: 'white',
      margin: 10,
      borderColor: 'grey',
      borderWidth: 1,
    }}>
    <View>
      <Image
        source={{uri: item.image}}
        style={{
          width: 200,
          height: 150,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          margin: 10,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            marginEnd: 50,
          }}>
          {item.duration}
        </Text>
        <Icon
          name="exclamationcircle"
          size={30}
          color="black"
          style={{
            marginTop: 10,
          }}
        />
      </View>
    </View>
  </View>
);

const HomeScreen: React.FC = () => {
  return (
    <Layout style={{flex: 1, padding: 2}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginStart: 10,
        }}>
        Selamat Datang di Aplikasi Kami !
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginStart: 10,
        }}>
        Memberdayakan dan Mendidik Pelawan Penindasan
      </Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginStart: 10,
          marginTop: 20,
        }}>
        Recomended Videos
      </Text>
      <FlatList
        data={data2}
        renderItem={renderItem2}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        style={{
          marginTop: 10,
          flexDirection: 'row',
          height: 310,
        }}
      />
    </Layout>
  );
};

export default HomeScreen;
