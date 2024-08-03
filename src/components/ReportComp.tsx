import {Button, CheckBox, Layout, Text, Avatar} from '@ui-kitten/components';
import React from 'react';
import {ReportTypeProps} from '../Types/ReportTypeProps';
import {TouchableOpacity, Image, useColorScheme} from 'react-native';

export default function ReportComp(props: ReportTypeProps) {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? 'white' : 'black';
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90%',
        height: 75,
        backgroundColor: props.color,
        borderRadius: 10,
        marginVertical: 10,
      }}
      onPress={props.onPress}>
      <Image
        source={props.icon}
        tintColor={'white'}
        style={{width: 30, height: 30}}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
        }}>
        {props.text}
      </Text>
      <CheckBox checked={props.status === 'success'} />
    </TouchableOpacity>
  );
}
