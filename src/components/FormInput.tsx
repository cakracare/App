import {StyleSheet} from 'react-native';
import {Button, Text, CheckBox, Input, Layout} from '@ui-kitten/components';
import {forminput} from '../Types/FormInputprops';

export default function FormInput(props: forminput) {
  return (
    <Layout style={styles.form}>
      <Text style={styles.label}>{props.label}</Text>
      <Input style={styles.input} placeholder={props.placeholder} />
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
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
  label1: {
    marginTop: 10,
    borderRadius: 10,
    fontSize: 13,
    color: 'grey',
  },
  input: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#EEEDEB',
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#3B6EA8',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  checkbox: {
    marginTop: 20,
  },
});
