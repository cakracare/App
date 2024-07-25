import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  Card: {
    width: 'auto',
    height: 'auto',
  },
  container: {
    flexDirection: 'row',
  },
  container1: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginStart: 10,
  },
  container2: {
    width: 'auto',
    height: 'auto',
    borderRadius: 5,
    backgroundColor: 'white',
    margin: 10,
    borderColor: 'grey',
    borderWidth: 1,
  },
  container3: {
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10,
  },
  Image: {
    width: 100,
    height: 100,
  },
  Image1: {
    width: 200,
    height: 150,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
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
    color: 'black',
    fontSize: 15,
  },
  Text3: {
    color: 'black',
    fontSize: 20,
    marginEnd: 50,
    fontWeight: 'bold',
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
