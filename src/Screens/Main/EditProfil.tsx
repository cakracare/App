import {Layout, Modal, Spinner} from '@ui-kitten/components';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
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
import {getUserId, updateUser} from '../../service';
import GenderSelect from "../../components/GenderSelect.tsx";
import {formattedField} from "../../helpers/formattedField.ts";

export default function EditProfil() {
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const {user, setUser} = useUser();
  const userCurrent = route.params?.user;
  const {formData, handleInputChange, errors, setFieldError, clearFieldError} =
    useForm(userCurrent);

  const handleUpdateAccount = async () => {
    setLoading(true);
    setUser(formData);
    const result = await updateUser(getUserId()!, formData);
    if (result.success) {
      ToastAndroid.show(result.message, ToastAndroid.SHORT);
      navigation.navigate('Account');
    }
  };

  const no_hp = user?.role === 'guru' ? 'no pribadi' : 'no ortu';

  return (
    <Layout>
      <Modal
        visible={loading}
        animationType="fade"
        backdropStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <Spinner size="giant" status="primary" />
      </Modal>
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
        <Layout style={styles.form}>
          {[
            'nama_lengkap',
            'email',
            'usia',
            "kelas",
            'asal_sekolah',
            'no_ortu',
            'alamat_lengkap',
          ].map(field => (
            <FormInput
              key={field}
              label={formattedField(field,user) }
              placeholder=""
              value={formData[field]}
              onChangeText={value => handleInputChange(field, value)}
              status={errors[field] ? 'danger' : 'basic'} // Set status based on error
              error={errors[field] || null}
            />
          ))}
          <GenderSelect onGenderChange={gender => handleInputChange('gender', gender)} />
        </Layout>

        <ButtonCompo
          width={300}
          status="primary"
          text="Simpan"
          onPress={handleUpdateAccount}
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
