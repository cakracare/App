import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {PetunjukTypeProps} from '../Types/PetunjukTypeProps';

export default function PetunjukComp(props: PetunjukTypeProps) {
  return (
    <Layout
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginEnd: 50,
      }}>
      <Text
        style={{
          fontSize: 16,
          marginStart: 30,
          padding: 2,
        }}>
        {props.number.toString()}
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginStart: 10,
          padding: 2,
        }}>
        {props.text}
      </Text>
    </Layout>
  );
}
