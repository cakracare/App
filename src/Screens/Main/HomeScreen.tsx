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
import styles from '../../style/HomeStyle.tsx';
import React, {useEffect} from 'react';
import { Logout} from '../../service/auth';
import { NavigationProp, useNavigation} from '@react-navigation/native';
import {useId} from "../../helpers/IdContext.tsx";
import {getUser} from "../../service/user.ts";
import {User} from "../../Types";


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
  <Card style={styles.Card}>
    <View style={styles.container}>
      <Image source={{uri: item.image}} style={styles.Image} />
      <View style={styles.container1}>
        <Text style={styles.Text}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.Text1}>
          {item.description}
        </Text>
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
  <View style={styles.container2}>
    <View>
      <Image source={{uri: item.image}} style={styles.Image1} />
      <View style={styles.container3}>
        <Text style={styles.Text2}>{item.title}</Text>
        <Text style={styles.Text3}>{item.duration}</Text>
      </View>
    </View>
  </View>
);

const HomeScreen: React.FC = () => {

    const [user, setUser] = React.useState<User | null>(null);
    const {id} = useId()



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


  return (
    <Layout style={{flex: 1, padding: 2}}>
      <Text style={styles.Text4}>Selamat Datang di Aplikasi Kami {name} !</Text>
      <Text style={styles.Text5}>
        Memberdayakan dan Mendidik Pelawan Penindasan
      </Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text style={styles.Text6}>Recomended Videos</Text>
      <FlatList
        data={data2}
        renderItem={renderItem2}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        style={styles.Flatlist}
      />
    </Layout>
  );
};

export default HomeScreen