import {Layout} from '@ui-kitten/components';
<<<<<<< HEAD
import {Image, ScrollView, StyleSheet} from 'react-native';
import FormInput from '../../components/FormInput';
import useForm from '../../helpers/useFormHooks';
import ButtonCompo from '../../components/ButtonCompo';

export default function EditProfil() {
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
  const {formData, handleInputChange, errors, setFieldError, clearFieldError} =
    useForm(initialState);
  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../../assets/img/logo.png')} />
=======
import {Alert, Image, ScrollView, StyleSheet, View} from 'react-native';
import FormInput from '../../components/FormInput';
import useForm from '../../helpers/useFormHooks';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import ButtonCompo from '../../components/ButtonCompo.tsx';
import {useUser} from '../../helpers/userContext.tsx';
import {getUserId, updateUser} from '../../service/user.ts';

export default function EditProfil() {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const {user, setUser} = useUser();
  const userCurrent = route.params?.user;
  console.log(userCurrent, 'dfgfdg');
  const {formData, handleInputChange, errors, setFieldError, clearFieldError} =
    useForm(userCurrent);

  const handleUpdateAccount = async () => {
    setUser(formData);
    const result = await updateUser(getUserId()!, formData);
    console.log(result);
    if (result.success) {
      Alert.alert(result.message);
      navigation.navigate('Account');
    }
  };
  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 20,
          }}>
          <Image
            source={require('../../assets/img/logo1.png')}
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
            }}
          />
          <Image
            source={require('../../assets/img/logo.png')}
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
            }}
          />
          <Image
            source={require('../../assets/img/logo2.png')}
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
            }}
          />
        </View>
>>>>>>> 6771e169155eb616d5e61e2a351a71f3d59ed0da
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
        </Layout>
        <ButtonCompo
          width={300}
          status="primary"
          text="Simpan"
<<<<<<< HEAD
          onPress={() => console.log('Simpan')}
=======
          onPress={handleUpdateAccount}
>>>>>>> 6771e169155eb616d5e61e2a351a71f3d59ed0da
        />
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
