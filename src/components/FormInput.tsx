import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Input, Layout } from '@ui-kitten/components';
import { forminput } from '../Types/FormInputprops';

export default function FormInput(props: forminput) {
  const isPasswordField = props.label.toLowerCase().includes('password' || 'confirm password');
  return (
      <Layout style={styles.form}>
        <Text style={styles.label}>{props.label}</Text>
        <Input
            style={styles.input}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChangeText}
            status={props.status} // Apply status prop
            secureTextEntry={isPasswordField}
        />
        {props.error && <Text style={styles.errorText}>{props.error}</Text>}
      </Layout>
  );
}

const styles = StyleSheet.create({
  form: {
    width: 300,
  },
  label: {
    marginTop: 20,
    borderRadius: 10,
    marginStart: 10,
    color: 'grey',
    fontSize: 15,
  },
  input: {
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: '#EEEDEB',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
