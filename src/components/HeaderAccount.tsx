import {Image, View} from 'react-native';
import styles from '../style/AccountStyle.tsx';
import {Text} from '@ui-kitten/components';
import React from 'react';
import {initialImage} from '../helpers/initialImage.ts';

type headerAccountProps = {
  image: string | undefined;
  name: string | undefined;
  email: string | undefined;
};

export const HeaderAccount = (
  props: headerAccountProps,
): React.ReactElement => {
  return (
    <View style={styles.container1}>
      <Image source={{uri: props.image || initialImage}} style={styles.Image} />
      <View style={styles.container2}>
        <Text style={styles.Text}>{props.name || 'loading bang'}</Text>
        <Text>{props.email || 'loading bang'}</Text>
      </View>
    </View>
  );
};
