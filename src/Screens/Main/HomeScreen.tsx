import {
  Button,
  Layout,
  Text,
  Card,
} from '@ui-kitten/components';
import {FlatList, Image, ScrollView, View} from 'react-native';
import styles from '../../style/HomeStyle.tsx';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useUser} from "../../helpers/userContext.tsx";
import React from 'react';
import {addQuestion, getQuestionsByType} from "../../service/questions.ts";


  const pertanyaan =  [
  {
    "id": "1",
    "type": "physical",
    "question": "Apakah Anda pernah mengalami kekerasan dengan menggunakan anggota tubuh (kaki, tangan dan anggota lain)?"
  },
  {
    "id": "2",
    "type": "physical",
    "question": "Apakah Anda pernah mengalami kekerasan dengan menggunakan benda?"
  },
  {
    "id": "3",
    "type": "physical",
    "question": "Apakah Anda pernah dimintai uang atau makanan atau benda lain oleh siswa lain secara paksa?"
  },
  {
    "id": "4",
    "type": "physical",
    "question": "Apakah Anda pernah dengan sengaja disenggol oleh siswa lain hingga terjatuh?"
  },
  {
    "id": "5",
    "type": "physical",
    "question": "Apakah Anda pernah ditumpahkan makanan atau minuman oleh siswa lain?"
  },
  {
    "id": "6",
    "type": "physical",
    "question": "Apakah Anda mendukung siswa lain yang suka memukul?"
  },
  {
    "id": "7",
    "type": "physical",
    "question": "Apakah Anda pernah diperintah siswa lain untuk mem-bully siswa lainnya?"
  },
  {
    "id": "8",
    "type": "physical",
    "question": "Apakah barang yang Anda miliki pernah disembunyikan oleh siswa lain?"
  },
  {
    "id": "9",
    "type": "physical",
    "question": "Apakah kendaraan Anda pernah dirusak oleh siswa lain?"
  },
  {
    "id": "10",
    "type": "physical",
    "question": "Apakah Anda pernah dipaksa untuk merekam kejadian pembullyan?"
  },
  {
    "id": "11",
    "type": "verbal",
    "question": "Apakah siswa lain pernah mengolok-olok Anda dengan menyebut nama orang tua?"
  },
  {
    "id": "12",
    "type": "verbal",
    "question": "Apakah Anda pernah dicela menggunakan nama nama hewan oleh siswa lain?"
  },
  {
    "id": "13",
    "type": "verbal",
    "question": "Apakah Anda pernah mendapatkan siulan atau apaan usil (catcalling) dari siswa lain?"
  },
  {
    "id": "14",
    "type": "verbal",
    "question": "Apakah Anda pernah diejek secara fisik (body shaming) oleh siswa lain?"
  },
  {
    "id": "15",
    "type": "verbal",
    "question": "Apakah Anda pernah dijauhi oleh siswa lain karena penyebaran berita yang tidak benar tentang Anda (fitnah/hoaks)?"
  },
  {
    "id": "16",
    "type": "verbal",
    "question": "Apakah Anda pernah diberikan julukan yang buruk?"
  },
  {
    "id": "17",
    "type": "verbal",
    "question": "Apakah Anda pernah mendapatkan ancaman dari siswa lain karena berselisih paham?"
  },
  {
    "id": "18",
    "type": "seksual",
    "question": "Apakah Anda pernah mengalami diskriminasi atau pelecehan tampilan fisik dan kondisi tubuh (body shaming) bernuansa seksual?"
  },
  {
    "id": "19",
    "type": "seksual",
    "question": "Apakah Anda pernah bertemu dengan orang lain yang membujuk, menjanjikan, atau menawarkan sesuatu kepada Anda dengan tujuan transaksi atau kegiatan seksual?"
  },
  {
    "id": "20",
    "type": "seksual",
    "question": "Apakah Anda pernah mengalami diintai atau dikuntit (stalking) siswa lain untuk melihat kegiatan pribadi Anda?"
  },
  {
    "id": "21",
    "type": "seksual",
    "question": "Apakah Anda pernah diintip siswa lain untuk melihat bagian tubuh tertentu Anda?"
  },
  {
    "id": "22",
    "type": "seksual",
    "question": "Apakah Anda pernah melihat siswa lain mengeluarkan maupun memainkan alat kelaminnya di depan Anda?"
  },
  {
    "id": "23",
    "type": "seksual",
    "question": "Apakah Anda pernah disentuh, diraba, dipegang, dipeluk, dicium atau digosokkan bagian tubuh anda oleh siswa lain?"
  },
  {
    "id": "24",
    "type": "seksual",
    "question": "Apakah Anda pernah mengalami percobaan pemerkosaan?"
  },
  {
    "id": "25",
    "type": "seksual",
    "question": "Apakah Anda pernah dirayu, digoda atau siulan yang bernuansa seksual?"
  },
  {
    "id": "26",
    "type": "seksual",
    "question": "Apakah pernah foto pribadi Anda disebarluaskan tanpa persetujuan Anda?"
  },
  {
    "id": "27",
    "type": "seksual",
    "question": "Apakah Anda pernah dikirimi pesan/gambar/foto/video bernuansa seksual?"
  },
  {
    "id": "28",
    "type": "psychological",
    "question": "Apakah Anda pernah siswa lain dengan tatapan yang tidak disukai atau sinis?"
  },
  {
    "id": "29",
    "type": "psychological",
    "question": "Apakah Anda pernah mendapati siswa lain membuang muka ketika Anda sapa?"
  },
  {
    "id": "30",
    "type": "psychological",
    "question": "Apakah Anda pernah mendapati siswa lain bersikap tidak peduli apabila Anda butuh bantuan?"
  },
  {
    "id": "31",
    "type": "psychological",
    "question": "Apakah Anda pernah dikucilkan oleh siswa lain?"
  },
  {
    "id": "32",
    "type": "psychological",
    "question": "Apakah Anda pernah ditinggal pergi oleh siswa lain ketika anda ingin bergabung dalam suatu tempat maupun kelompok?"
  },
  {
    "id": "33",
    "type": "cyber",
    "question": "Apakah Anda pernah difitnah atau diolok-olok melalui sosial media?"
  },
  {
    "id": "34",
    "type": "cyber",
    "question": "Apakah Anda pernah mendapatkan ancaman atau teror melalui sosial media?"
  },
  {
    "id": "35",
    "type": "cyber",
    "question": "Apakah Anda pernah mendapati akun sosial media palsu yang berpura pura menjadi kerabat dan meminta uang atau barang kepada Anda?"
  },
  {
    "id": "36",
    "type": "cyber",
    "question": "Apakah Anda pernah mendapati foto pribadi Anda digunakan orang yang tidak bertanggung jawab untuk melakukan tindakan kriminal?"
  },
  {
    "id": "37",
    "type": "cyber",
    "question": "Apakah akun sosial media Anda pernah dibobol orang lain untuk kegiatan yang merugikan (meminta uang, pulsa, barang)?"
  },
  {
    "id": "38",
    "type": "cyber",
    "question": "Apakah Anda pernah mengalami foto pribadi Anda disebar dan digunakan sebagai bahan ejekan (stiker wa, upload status)?"
  },
  {
    "id": "39",
    "type": "cyber",
    "question": "Apakah Anda pernah mendapatkan komentar dengan kata-kata yang buruk pada postingan di media sosial Anda?"
  },
  {
    "id": "40",
    "type": "cyber",
    "question": "Apakah Anda pernah dikucilkan oleh siswa lain dalam lingkup pertemanan Anda melalui media layanan chatting?"
  },
  {
    "id": "41",
    "type": "cyber",
    "question": "Apakah Anda pernah mengalami tidak direspon oleh siapapun ketika bertanya di obrolan grup?"
  },
  {
    "id": "42",
    "type": "cyber",
    "question": "Apakah Anda pernah merasa dipermalukan oleh siswa lain melalui media sosial?"
  }
]



const HomeScreen: React.FC = () => {
    const handleAddQuesttions = async ()=>{
     const result = await getQuestionsByType('cyber')
      console.log(result)
    }


  return (
    <ScrollView>
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
        <Button onPress={handleAddQuesttions}>add questions</Button>
      </Layout>
    </ScrollView>
  );
};

export default HomeScreen