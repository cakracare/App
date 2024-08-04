import {Card, Layout, Text} from '@ui-kitten/components';
import {HasilProps} from '../Types/CardHasilProps';
import {View} from 'react-native';

export default function HasilCompo(props: HasilProps) {
  return (
    <Layout
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '96%',
      }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: 'bold',
          padding: 2,
        }}>
        {props.label}
      </Text>
      <View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 12,
            marginStart: 10,
            padding: 2,
          }}>
          {props.text}
        </Text>
      </View>
    </Layout>
  );
}
