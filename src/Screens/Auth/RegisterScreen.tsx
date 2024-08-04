import React, {useState} from 'react';
import {Button, Text, CheckBox, Input, Layout} from '@ui-kitten/components';
import {Alert, Image, ScrollView, StyleSheet, ToastAndroid} from 'react-native';
import FormInput from '../../components/FormInput';
import useForm from '../../helpers/useFormHooks';
import {handleZodError, validateUser} from '../../helpers/validateUser.ts';
import {Logout, SignUpWithEmailAndPassword} from '../../service';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import ButtonCompo from '../../components/ButtonCompo.tsx';

const initialState = {
  nama_lengkap: '',
  email: '',
  usia: '',
  kelas: '',
  asal_sekolah: '',
  no_ortu: '',
  alamat_lengkap: '',
  password: '',
  confirm_password: '',
};

export default function RegisterScreen() {
  const {formData, handleInputChange, errors, setFieldError, clearFieldError} =
    useForm(initialState);
  const navigation = useNavigation<NavigationProp<any>>();

  const [isChecked, setIsChecked] = useState(false);

  const validateForm = () => {
    Object.keys(formData).forEach(field => clearFieldError(field));
    const {success, error} = validateUser(formData);
    if (!success) {
      const errorMessages = handleZodError(error);
      Object.keys(errorMessages).forEach(field => {
        setFieldError(field, errorMessages[field]);
      });
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      const user = validateUser(formData);
      if (user.success) {
        // @ts-ignore
        const newUser = await SignUpWithEmailAndPassword(
          user?.data,
          user?.data.password,
          user?.data.confirm_password,
        );
        if (newUser?.success) {
          await Logout();
          navigation.navigate('Login');
          ToastAndroid.show(newUser?.message, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(newUser?.message, ToastAndroid.SHORT);
        }
      }
    }
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../../assets/img/logo.png')} />
        <Layout style={styles.form}>
          {[
            'nama_lengkap',
            'email',
            'usia',
            'kelas',
            'asal_sekolah',
            'gender',
            'no_ortu',
            'alamat_lengkap',
          ].map(field => (
            <FormInput
              key={field}
              label={field
                .replace(/_/g, ' ')
                .replace(/([A-Z])/g, ' $1')
                .trim()}
              placeholder=""
              value={formData[field]}
              onChangeText={value => handleInputChange(field, value)}
              status={errors[field] ? 'danger' : 'basic'} // Set status based on error
              error={errors[field] || null}
            />
          ))}
          <FormInput
            label="Password"
            placeholder=""
            value={formData.password}
            onChangeText={value => handleInputChange('password', value)}
            status={errors.password ? 'danger' : 'basic'}
            error={errors.password} // Pass error message
            secureTextEntry
          />
          <Text style={styles.label}>Minimum 8 characters</Text>
          <FormInput
            label="Confirm Password"
            placeholder=""
            value={formData.confirm_password}
            onChangeText={value => handleInputChange('confirm_password', value)}
            status={errors.confirm_password ? 'danger' : 'basic'}
            error={errors.confirm_password} // Pass error message
            secureTextEntry
          />
          <Text style={styles.label}>Minimum 8 characters</Text>
          <CheckBox
            style={styles.checkbox}
            checked={isChecked}
            onChange={setIsChecked}>
            Saya Setuju dengan ketentuan diatas
          </CheckBox>
          <ButtonCompo
            status="primary"
            width={300}
            onPress={handleRegister}
            disabled={!isChecked}
            text="Daftar"
          />
        </Layout>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  form: {
    width: 300,
  },
  label: {
    marginTop: 10,
    borderRadius: 10,
    fontSize: 13,
    color: 'grey',
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
