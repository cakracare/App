import {Button, Card, Layout} from '@ui-kitten/components';
import {StyleSheet, Image, Text, TouchableOpacity, View} from 'react-native';

export default function ReportDetail() {
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'column'}}>
        <TouchableOpacity
          style={{
            width: 300,
            height: 100,
            backgroundColor: 'cyan',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Image
            source={require('../../Image/speaking.png')}
            style={{
              width: 50,
              height: 50,
            }}
          />
          <Text style={{color: '#000000', fontSize: 20}}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 300,
            height: 100,
            backgroundColor: 'cyan',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Image
            source={require('../../Image/speaking.png')}
            style={{
              width: 50,
              height: 50,
            }}
          />
          <Text style={{color: '#000000', fontSize: 20}}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 300,
            height: 100,
            backgroundColor: 'cyan',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Image
            source={require('../../Image/speaking.png')}
            style={{
              width: 50,
              height: 50,
            }}
          />
          <Text style={{color: '#000000', fontSize: 20}}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 300,
            height: 100,
            backgroundColor: 'cyan',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Image
            source={require('../../Image/speaking.png')}
            style={{
              width: 50,
              height: 50,
            }}
          />
          <Text style={{color: '#000000', fontSize: 20}}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 300,
            height: 100,
            backgroundColor: 'cyan',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Image
            source={require('../../assets/img/speaking.png')}
            style={{
              width: 50,
              height: 50,
            }}
          />
          <Text style={{color: '#000000', fontSize: 20}}>Report</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}
