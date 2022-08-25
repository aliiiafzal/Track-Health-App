import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  conatainer: {
    flex: 1,
    backgroundColor: '#4F96BD',
  },
  flexbox1: {
    flex: 0.33,
    //backgroundColor: 'red',
    flexDirection: 'row',
  },
  button: {
    flex: 0.5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    borderRadius: 7,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4F96BD',
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
  },
});
