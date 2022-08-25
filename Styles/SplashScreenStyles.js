import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flexbox1: {
    flex: 0.1,
    justifyContent: 'center',
  },
  flexbox2: {
    flex: 0.7,
    justifyContent: 'center',
    //backgroundColor: 'gray',
    alignItems: 'center',
  },
  flexbox3: {
    flex: 0.2,
    justifyContent: 'center',
  },
  image: {
    //flex: 20,
    justifyContent: 'center',
    height: 500,
    width: 500,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  Button1: {
    marginTop: 55,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    //backgroundColor: '#00BCD4',
    backgroundColor: '#4F96BD',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
});
