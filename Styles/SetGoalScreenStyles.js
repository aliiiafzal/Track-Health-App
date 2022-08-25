import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: 'white',
  },
  gif: {
    height: 250,
    width: 250,
  },
  flexbox2: {
    flex: 0.07,
    backgroundColor: 'lightblue',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    //backgroundColor: 'yellow',
  },
  activitytext: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    color: 'black',
    fontWeight: '500',
  },
  flexbox3: {
    flex: 0.28,
    backgroundColor: 'lightblue',
    //backgroundColor: 'gray',
    flexDirection: 'row',
  },
  button: {
    flex: 0.5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#4F96BD',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    //color: '#4F96BD',
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
  },
  flexbox1: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'gray',
  },
});
