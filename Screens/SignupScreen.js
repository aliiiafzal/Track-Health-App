import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useRef} from 'react';
import * as Animatable from 'react-native-animatable';
import styles from '../Styles/LoginSignupScreenStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../FirebaseConfig';
import {getDatabase, ref, set} from 'firebase/database';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from '@firebase/auth';
import {CheckOrientation} from '../Components/CheckOrientation';

const SignupScreen = () => {
  const navigation = useNavigation();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const dbref = getDatabase(app);
  const orientation = CheckOrientation();

  const [data, setData] = React.useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    isValidUserName: false,
    isValidEmail: false,
    isValidPassword: false,
    isValidConfirmPassword: false,
  });
  const emailref = useRef();
  const paswordref = useRef();
  const cpasswordref = useRef();

  const senddata = () => {
    const username = data.username;
    const email = data.email;
    const password = data.password;
    var text = email.replace(/\./g, ',');
    set(ref(dbref, 'UserRecord/' + text), {
      username,
      email,
      password,
    });
  };

  const Register = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(userCredential => {
        console.log('Account created');
        Alert.alert('Sign Up Successfully', null, [{text: 'Okay'}]);
        senddata();
        navigation.navigate('userdetail', {useremail: data.email});
        sendEmailVerification(auth.currentUser, auth.applyActionCode).then(
          () => {},
        );
      }, null)
      .catch(error => {
        console.log(error);
        Alert.alert('Error', error.message, [{text: 'Okay'}]);
      });
  };

  const handleusername = val => {
    if (val.length != 0) {
      setData({
        ...data,
        username: val,
        isValidUserName: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        isValidUserName: false,
      });
    }
  };

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

  const handleconfirmpassword = val => {
    if (val.length != 0) {
      setData({
        ...data,
        confirm_password: val,
        isValidConfirmPassword: true,
      });
    } else {
      setData({
        ...data,
        confirm_password: val,
        isValidConfirmPassword: false,
      });
    }
  };

  const validateform = () => {
    if (
      data.username.length == 0 ||
      data.email.length == 0 ||
      data.password.length == 0 ||
      data.confirm_password.length == 0 ||
      !data.isValidUserName ||
      !data.isValidEmail ||
      !data.isValidPassword ||
      !data.isValidConfirmPassword
    ) {
      Alert.alert('ERROR!', 'Empty Field or Wrong Input.', [{text: 'Okay'}]);
      return;
    } else {
      if (data.password != data.confirm_password) {
        Alert.alert('ERROR!', 'Password Not Matched.', [{text: 'Okay'}]);
        return;
      }
      Register();
    }
  };

  if (orientation === 'PORTRAIT') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>Register Here!</Text>
        </View>

        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.text_footer}>Username</Text>

            <View style={styles.flexbox1}>
              <Icon name="user" size={30} color="black" />
              <TextInput
                placeholder="Your Name"
                placeholderTextColor="#666666"
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={text => handleusername(text)}
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailref.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>

            <Text style={styles.text_footer}>Email</Text>

            <View style={styles.flexbox1}>
              <Icon name="envelope" size={26} color="black" />
              <TextInput
                placeholder="Your Email"
                placeholderTextColor="#666666"
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={text => handleemail(text)}
                ref={emailref}
                returnKeyType="next"
                onSubmitEditing={() => {
                  paswordref.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>

            <Text style={styles.text_footer}>Password</Text>

            <View style={styles.flexbox1}>
              <Icon name="key" size={27} color="black" />
              <TextInput
                placeholder="Your Password"
                placeholderTextColor="#666666"
                secureTextEntry={true}
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={text => handlepassword(text)}
                ref={paswordref}
                returnKeyType="next"
                onSubmitEditing={() => {
                  cpasswordref.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>

            <Text style={styles.text_footer}>Confirm Password</Text>

            <View style={styles.flexbox1}>
              <Icon name="key" size={27} color="black" />
              <TextInput
                placeholder="Your Password"
                placeholderTextColor="#666666"
                secureTextEntry={true}
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={text => handleconfirmpassword(text)}
                ref={cpasswordref}
              />
            </View>

            <View style={styles.button}>
              <TouchableOpacity onPress={validateform} style={styles.signIn}>
                <Text style={styles.textSign}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('loginscreen')}
                style={styles.signIn}>
                <Text style={styles.textSign}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    );
  } else {
    return (
      <View style={styles.Landscapecontainer}>
        <View style={styles.Landscapeheader}>
          <Text style={styles.text_header}>Register Here!</Text>
        </View>

        <Animatable.View animation="fadeInUpBig" style={styles.Landscapefooter}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.text_footer}>Username</Text>

            <View style={styles.flexbox1}>
              <Icon name="user" size={30} color="black" />
              <TextInput
                placeholder="Your Name"
                placeholderTextColor="#666666"
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={text => handleusername(text)}
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailref.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>

            <Text style={styles.text_footer}>Email</Text>

            <View style={styles.flexbox1}>
              <Icon name="envelope" size={26} color="black" />
              <TextInput
                placeholder="Your Email"
                placeholderTextColor="#666666"
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={text => handleemail(text)}
                ref={emailref}
                returnKeyType="next"
                onSubmitEditing={() => {
                  paswordref.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>

            <Text style={styles.text_footer}>Password</Text>

            <View style={styles.flexbox1}>
              <Icon name="key" size={27} color="black" />
              <TextInput
                placeholder="Your Password"
                placeholderTextColor="#666666"
                secureTextEntry={true}
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={text => handlepassword(text)}
                ref={paswordref}
                returnKeyType="next"
                onSubmitEditing={() => {
                  cpasswordref.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>

            <Text style={styles.text_footer}>Confirm Password</Text>

            <View style={styles.flexbox1}>
              <Icon name="key" size={27} color="black" />
              <TextInput
                placeholder="Your Password"
                placeholderTextColor="#666666"
                secureTextEntry={true}
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={text => handleconfirmpassword(text)}
                ref={cpasswordref}
              />
            </View>

            <View style={styles.Landscapebutton}>
              <TouchableOpacity onPress={validateform} style={styles.signIn}>
                <Text style={styles.textSign}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('loginscreen')}
                style={styles.signIn}>
                <Text style={styles.textSign}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    );
  }
};

export default SignupScreen;
