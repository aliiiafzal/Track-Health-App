import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0dcdc',
  },
  flexbox1: {
    flex: 0.4,
    //backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 200 / 2,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  email: {
    fontSize: 20,
    color: 'black',
  },
  flexbox2: {
    flex: 0.15,
    //backgroundColor: 'yellow',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  icon: {
    flex: 0.1,
    marginRight: 10,
  },
  weight: {
    flex: 0.4,
  },
  weighttext: {
    fontSize: 25,
    color: 'black',
  },
  getweight: {
    flex: 0.5,
  },
  getweighttext: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});
