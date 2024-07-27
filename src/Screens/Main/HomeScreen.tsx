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
import styles from '../../style/HomeStyle.tsx';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Logout} from "../../service/auth.tsx";
import { NavigationProp, useNavigation} from '@react-navigation/native';
const HomeScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const handleLogout= async ()=>{
        const a = await Logout()
        console.log(a.message)

        if (a.success) {
            navigation.navigate('AuthNavigator',{Screen: 'LoginScreen'});
        }
    }
  return (
    <Layout style={{flex: 1, padding: 5}}>
      <Text style={styles.Text4}>Selamat Datang di Aplikasi Kami !</Text>
      <Text style={styles.Text5}>
        Memberdayakan dan Mendidik Pelawan Penindasan
      </Text>
      <Card style={styles.Card}>
        <View style={styles.container}>
          <Image
            source={{
              uri: 'https://emojiguide.com/wp-content/uploads/platform/google/44140.png',
            }}
            style={styles.Image}
          />
          <View style={styles.container1}>
            <Text style={styles.Text}>Bullying</Text>
            <Text numberOfLines={3} style={styles.Text1}>
              Learn about the different types of bullying and its impact on
              individuals.
            </Text>
          </View>
        </View>
      </Card>
      <Text style={styles.Text6}>Recomended Videos</Text>
      <Card style={styles.Card}>
        <YoutubePlayer height={200} play={false} videoId={'r8tCRia5-pc'} />
        <View style={styles.container2}>
          <Text style={styles.Text2}>
            Menjadi Pelaku Perundungan (Bullying) yang Tidak Disadari! Kenali
            Ciri-cirinya.
          </Text>
          <Text
            style={{
              textAlign: 'justify',
            }}>
            Coba kamu ingat, pernahkah kamu merasa senang saat mengejek orang
            lain? Tonton video ini untuk mengetahui apakah kamu adalah pelaku
            perundungan atau bukan.
          </Text>
        </View>
      </Card>
      <Button onPress={handleLogout}>logut</Button>
    </Layout>
  );
};

export default HomeScreen;
