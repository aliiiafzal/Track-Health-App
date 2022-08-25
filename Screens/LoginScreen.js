import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from '../Styles/LoginSignupScreenStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {LOGIN_EMAIL} from '../Redux/Actions/LoginAction';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../FirebaseConfig';
import {signInWithEmailAndPassword, getAuth} from '@firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const [data, setData] = React.useState({
    email: '',
    password: '',
    isValidEmail: false,
    isValidPassword: false,
  });

  const handleemail = val => {
    if (val.length !== 0) {
      const check =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (check.test(String(val).toLowerCase())) {
        setData({
          ...data,
          email: val,
          isValidEmail: true,
        });
      } else {
        setData({
          ...data,
          email: val,
          isValidEmail: false,
        });
      }
    } else {
      setData({
        ...data,
        email: val,
        isValidEmail: false,
      });
    }
  };

  const handlepassword = val => {
    if (val.length != 0) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const Login = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(userCredential => {
        console.log('Account Login');
        const user = userCredential.user;
        //console.log(user);
        dispatch({type: LOGIN_EMAIL, payload: data.email});
        setTimeout(() => {
          setModalVisible(false);
          //navigation.navigate('homescreen');
          navigation.navigate('tabdrawer');
          Alert.alert(' Login Successfully');
        }, 3000);
      }, null)
      .catch(error => {
        console.log(error);
        Alert.alert('Error', error.message, [{text: 'Okay'}]);
        setModalVisible(false);
      });
  };

  const validateform = () => {
    setModalVisible(true);
    if (
      data.email.length == 0 ||
      data.password.length == 0 ||
      !data.isValidEmail ||
      !data.isValidPassword
    ) {
      Alert.alert('ERROR!', 'Empty Field or Wrong Input.', [{text: 'Okay'}]);
      return;
    } else {
      Login();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>

        <View style={styles.flexbox1}>
          <Icon name="email" size={30} color="black" />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={text => handleemail(text)}
          />
        </View>
        {data.isValidEmail ? null : (
          <Animatable.View animation="fadeInLeft" duration={600}>
            <Text style={styles.errorMsg}>Please Enter Valid Email.</Text>
          </Animatable.View>
        )}

        <Text style={styles.text_footer}>Password</Text>

        <View style={styles.flexbox1}>
          <Icon name="key-variant" size={30} color="black" />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={true}
            style={styles.textInput}
            autoCapitalize="none"
            keyboardType="default"
            onChangeText={text => handlepassword(text)}
          />
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={600}>
            <Text style={styles.errorMsg}>Please Enter Valid Password.</Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>

        <View style={styles.button}>
          <TouchableOpacity
            disabled={!data.isValidEmail || !data.isValidPassword}
            onPress={validateform}
            style={
              !data.isValidEmail || !data.isValidPassword
                ? styles.signIn1
                : styles.signIn
            }
            //style={styles.signIn}
          >
            <Text style={styles.textSign}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('signupscreen')}
            style={styles.signIn}>
            <Text style={styles.textSign}>Sign Up</Text>
          </TouchableOpacity>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={{marginTop: 400}}>
              <ActivityIndicator size="large" color="#4F96BD" />
            </View>
          </Modal>
        </View>
      </Animatable.View>
    </View>
  );
};

export default LoginScreen;
