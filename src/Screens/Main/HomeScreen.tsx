import {
  Button,
  Layout,
  Text,
  Card,
} from '@ui-kitten/components';
import {FlatList, Image, ScrollView, View} from 'react-native';
import styles from '../../style/HomeStyle.tsx';
import YoutubePlayer from 'react-native-youtube-iframe';





const HomeScreen: React.FC = () => {

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
    </Layout>
  );
};

export default HomeScreen