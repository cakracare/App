import {Button, Card, Layout} from '@ui-kitten/components';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ReportDetail() {
  return (
    <Layout style={{flex: 1, padding: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <View
          style={{
            alignItems: 'center',
            borderColor: 'grey',
            borderWidth: 1,
            width: 150,
            height: 'auto',
            marginEnd: 10,
            borderRadius: 10,
            padding: 10,
          }}>
          <Icon
            name="add-circle-outline"
            size={50}
            color={'#373A40'}
            style={{
              backgroundColor: '#EEEDEB',
              borderRadius: 50,
            }}
          />
          <Text
            style={{
              color: 'black',
            }}>
            Laporkan Bullying
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            borderColor: 'grey',
            borderWidth: 1,
            width: 150,
            height: 'auto',
            marginStart: 10,
            padding: 10,
            borderRadius: 10,
          }}>
          <Icon
            name="my-library-books"
            size={50}
            color={'#373A40'}
            style={{
              backgroundColor: '#EEEDEB',
              borderRadius: 50,
            }}
          />
          <Text
            style={{
              color: 'black',
            }}>
            Lihat Laporan
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: 'black',
          fontFamily: 'Poppins-Bold',
          fontSize: 20,
          marginTop: 20,
          fontWeight: 'bold',
        }}>
        Recent Report
      </Text>
    </Layout>
  );
}
