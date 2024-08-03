import {Button, Icon, Text} from '@ui-kitten/components';
import React from 'react';
import {ButtonProps} from '../Types/ButtonProps';

export default function ButtonCompo(props: ButtonProps) {
  return (
    <Button
      style={{
        marginVertical: 10,
        borderRadius: 10,
        width: props.width,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 0,
      }}
      status={props.status}
      onPress={props.onPress}
      disabled={props.disabled}>
      <Text>{props.text}</Text>
    </Button>
  );
}
