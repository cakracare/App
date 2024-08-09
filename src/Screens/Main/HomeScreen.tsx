import {Layout, Text, Card, Button} from '@ui-kitten/components';
import {Image, Linking, ScrollView, View} from 'react-native';
import styles from '../../style/HomeStyle.tsx';
import YoutubePlayer from 'react-native-youtube-iframe';
import React from 'react';
import {useUser} from '../../helpers/userContext.tsx';
import {Platform} from 'react-native';
import {checkConnections, sendEmail} from "../../helpers/sendMail.ts";

const HomeScreen: React.FC = () => {
  const version = Platform.Version;
  const {user, setUser} = useUser();
  console.log('version', version);



  //   masukkan nama user kedalam kata sambutan
  return (
    <Layout style={{flex: 1, padding: 5}}>
      <ScrollView>
        <Text style={styles.Text4}>
          Selamat Datang, {user?.nama_lengkap!} !
        </Text>
        <Text style={styles.Text5}>
          Memberdayakan dan Mendidik Pelawan Penindasan
        </Text>
        <Card
          style={styles.Card}
          onPress={async () => {
            await Linking.openURL('https://www.halodoc.com/kesehatan/bullying');
          }}>
          <View style={styles.container}>
            <Image
              source={{
                uri: 'https://disdik.purwakartakab.go.id/asset/foto_berita/Bullying-Kompasiana.jpg',
              }}
              style={styles.Image}
            />
            <View style={styles.container1}>
              <Text style={styles.Text}>Bullying</Text>
              <Text numberOfLines={3} style={styles.Text1}>
                Bullying merupakan tindakan mengganggu, mengusik, atau menyakiti
                orang lain secara fisik atau psikis.
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
      </ScrollView>
    </Layout>
  );
};

export default HomeScreen;
