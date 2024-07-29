import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
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
    paddingVertical: 5,
  },
  label1: {
    marginTop: 10,
    borderRadius: 10,
    fontSize: 13,
    color: 'grey',
    paddingVertical: 5,
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
    paddingVertical: 5,
  },
});
