import {StyleSheet} from 'react-native';
import {Text} from 'react-native-svg';

export default StyleSheet.create({
  Card: {
    width: 'auto',
    height: 'auto',
  },
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  container1: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginStart: 10,
  },
  container2: {
    padding: 10,
  },
  Image: {
    width: 100,
    height: 100,
  },
  Text: {
    color: 'black',
    fontSize: 20,
  },
  Text1: {
    color: 'black',
    fontSize: 15,
    marginEnd: 50,
  },
  Text2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  Text4: {
    fontSize: 20,
    fontWeight: 'bold',
    marginStart: 10,
  },
  Text5: {
    fontSize: 15,
    marginStart: 10,
  },
  Text6: {
    fontSize: 20,
    fontWeight: 'bold',
    marginStart: 10,
    marginTop: 20,
  },
  Flatlist: {
    marginTop: 10,
    flexDirection: 'row',
    height: 310,
  },
});
