import {Button, Card, Icon, Layout, Text} from '@ui-kitten/components';
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
          justifyContent: 'flex-start',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="file-text" fill="black" style={{width: 32, height: 32}} />
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginStart: 20,
            }}>
            {props.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginStart: 20,
            }}>
            {props.time}
          </Text>
        </View>
        <Text
          style={{
            position: 'absolute',
            right: 10,
            fontSize: 14,
            fontWeight: 'bold',
            color: props.status === 'success' ? 'green' : 'red',
          }}>
          {props.text}
        </Text>
      </Layout>
    </Card>
  );
}
