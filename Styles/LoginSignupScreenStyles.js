import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F96BD',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
    marginTop: 35,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  flexbox1: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  button1: {
    alignItems: 'center',
    marginTop: 20,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 15,
    //backgroundColor: '#4F96BD',
    backgroundColor: 'lightblue',
  },
  signIn1: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 15,
    //backgroundColor: '#4F96BD',
    backgroundColor: 'lightblue',
    opacity: 0.5,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  forgot: {
    color: 'blue',
    marginTop: 15,
  },
  picker: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },

  Landscapecontainer: {
    flex: 1,
    backgroundColor: '#4F96BD',
    //marginHorizontal: '20%',
  },

  Landscapefooter: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginHorizontal: '15%',
  },
  Landscapeheader: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
    marginHorizontal: '15%',
  },
  Landscapebutton: {
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: '15%',
  },
  Landscapebutton1: {
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: '15%',
  },
});
