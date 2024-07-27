import {Button, Text, CheckBox, Input, Layout} from '@ui-kitten/components';
import {useState} from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import FormInput from '../../components/FormInput';

export default function RegisterScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [error1, setError1] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleRegister = () => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setError1('');
    } else if (password !== confirmPassword) {
      setError1('Password and Confirm Password must match');
      setError('');
    } else {
      setError('');
      setError1('');
      // Proceed with registration logic
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../Image/logo.png')} />
      <Layout style={styles.form}>
        <FormInput label="Nama Lengkap" placeholder="" />
        <FormInput label="Email" placeholder="" />
        <FormInput label="Usia" placeholder="" />
        <FormInput label="Kelas" placeholder="" />
        <FormInput label="Asal Sekolah" placeholder="" />
        <FormInput label="No. Orang Tua" placeholder="" />
        <FormInput label="Alamat Lenkap" placeholder="" />
        <Text style={styles.label}>Password</Text>
        <Input
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Text style={styles.label1}>Minimum 8 characters</Text>
        <Text style={styles.label}>Confirm Password</Text>
        <Input
          style={styles.input}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {error1 ? <Text style={styles.errorText}>{error1}</Text> : null}
        <Text style={styles.label1}>Minimum 8 characters</Text>
        <CheckBox
          style={styles.checkbox}
          checked={isChecked}
          onChange={setIsChecked}>
          Saya Setuju dengan ketentuan diatas
        </CheckBox>
        <Button
          style={styles.button}
          onPress={handleRegister}
          disabled={!isChecked}>
          <Text style={styles.buttonText}>Daftar</Text>
        </Button>
      </Layout>
    </ScrollView>
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
