import {Layout} from '@ui-kitten/components';
import {Image, ScrollView, StyleSheet} from 'react-native';
import FormInput from '../../components/FormInput';
import useForm from '../../helpers/useFormHooks';

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
