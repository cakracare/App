import {Button, Card, Icon, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {useColorScheme, View} from 'react-native';
import {CardCompProps} from '../Types/CardProps';

export default function CardComp(props: CardCompProps) {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? 'white' : 'black';
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
          // marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Icon
          name="file-text"
          fill={iconColor}
          style={{width: 32, height: 32}}
        />
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
            marginLeft: 20,
            right: 10,
            fontSize: 14,
            fontWeight: 'bold',
            color: props.status,
          }}>
          {props.text}
        </Text>
      </Layout>
    </Card>
  );
}
