import {Card, Icon, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import {CardCompProps} from '../Types/CardProps';

export default function CardComp(props: CardCompProps) {
  return (
    <Card
      style={{
        width: '100%',
        marginTop: 10,
        borderColor: 'gray',
      }}
      onPress={
        () => {
          props.onPress();
        }
        // console.log('Card Pressed')
      }>
      <Layout
        style={{
          width: '100%',
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="archive" fill="black" style={{width: 32, height: 32}} />
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {props.title}
          </Text>
          <Text>{props.time}</Text>
        </View>
        <Text status={props.status}>Selesai</Text>
      </Layout>
    </Card>
  );
}
