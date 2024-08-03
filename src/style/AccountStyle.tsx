import {StyleSheet, Text} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  container1: {
    flexDirection: 'row',
    margin: 10,
  },
  container2: {
    flexDirection: 'column',
    margin: 20,
  },
  container3: {
    flexDirection: 'row',
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    padding: 10,
  },
  container4: {
    flexDirection: 'row',
    margin: 10,
  },
  container5: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    marginStart: 160,
    alignItems: 'center',
    padding: 5,
  },
  Image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
  },
  icon: {
    marginEnd: 10,
  },
  Text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  Text2: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlignVertical: 'center',

  },
  Text3: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    marginEnd: 20,
    textAlign: 'right',
    textAlignVertical: 'center',
  },
  Text4: {
    fontSize: 20,
    fontWeight: 'bold',
    marginStart: 10,
  },
  Text5: {
    fontSize: 15,
    fontWeight: 'bold',
    marginEnd: 4,
  },
});
