import {Button, CheckBox, Layout, Text, Avatar} from '@ui-kitten/components';
import React from 'react';
import {ReportTypeProps} from '../Types/ReportTypeProps';
import {TouchableOpacity, Image} from 'react-native';

export default function ReportComp(props: ReportTypeProps) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        height: 100,
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
      }}
      onPress={props.onPress}>
      <Avatar
        shape="square"
        source={props.icon}
        style={{width: 30, height: 30}}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#000',
        }}>
        {props.text}
      </Text>
      <CheckBox checked={props.status === 'success'} />
    </TouchableOpacity>
  );
}
