import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import styles from '../Styles/LoginSignupScreenStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../FirebaseConfig';
import {getDatabase, ref, set, get, child} from 'firebase/database';

const UserDeatil = ({route}) => {
  const navigation = useNavigation();
  const app = initializeApp(firebaseConfig);
  const dbRef = ref(getDatabase());
  const useremail = route.params.useremail;

  const [data, setData] = React.useState({
    weight: '',
    height: '',
    age: '',
    gender: 'Select Gender',
    isValidWeight: false,
    isValidHeight: false,
    isValidAge: false,
    isValidGender: false,
  });

  const senddata = () => {
    try {
      get(child(dbRef, `UserRecord`))
        .then(snapshot => {
          if (snapshot.exists()) {
            snapshot.forEach(child => {
              //console.log(child.val().email);
              if (useremail == child.val().email) {
                const weight = data.weight;
                const height = data.height;
                const age = data.age;
                const gender = data.gender;
                const email = child.val().email;
                const password = child.val().password;
                const username = child.val().username;
                const Image =
                  'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
                var text = useremail.replace(/\./g, ',');
                set(ref(getDatabase(), 'UserRecord/' + text), {
                  username,
                  email,
                  password,
                  weight,
                  height,
                  age,
                  gender,
                  Image,
                });
                Alert.alert('Data Submited Successfully', null, [
                  {text: 'Okay'},
                ]);
                navigation.navigate('loginscreen');
              }
            });
          } else {
            console.log('No data available');
          }
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      // Error retrieving data
    }
  };

  const handleweight = val => {
    if (val.length != 0) {
      setData({
        ...data,
        weight: val,
        isValidWeight: true,
      });
    } else {
      setData({
        ...data,
        weight: val,
        isValidWeight: false,
      });
    }
  };

  const handleheight = val => {
    if (val.length != 0) {
      setData({
        ...data,
        height: val,
        isValidHeight: true,
      });
    } else {
      setData({
        ...data,
        height: val,
        isValidHeight: false,
      });
    }
  };

  const handleage = val => {
    if (val.length != 0) {
      setData({
        ...data,
        age: val,
        isValidAge: true,
      });
    } else {
      setData({
        ...data,
        age: val,
        isValidAge: false,
      });
    }
  };

  const handlegender = val => {
    if (val.length != 0) {
      setData({
        ...data,
        gender: val,
        isValidGender: true,
      });
    } else {
      setData({
        ...data,
        gender: val,
        isValidGender: false,
      });
    }
  };

  const validateform = () => {
    if (
      data.weight.length == 0 ||
      data.height.length == 0 ||
      data.age.length == 0 ||
      data.gender.length == 0 ||
      data.gender.length == 13 ||
      !data.isValidWeight ||
      !data.isValidHeight ||
      !data.isValidAge ||
      !data.isValidGender
    ) {
      Alert.alert('ERROR!', 'Empty Field or Wrong Input.', [{text: 'Okay'}]);
      return;
    } else {
      senddata();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>User Detail...</Text>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text_footer}>Weight</Text>

          <View style={styles.flexbox1}>
            <Icon name="weight-kilogram" size={30} color="black" />
            <TextInput
              placeholder="Weight in KG"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={text => handleweight(text)}
            />
          </View>

          <Text style={styles.text_footer}>Height</Text>

          <View style={styles.flexbox1}>
            <Icon name="human-male-height" size={26} color="black" />
            <TextInput
              placeholder="Height in meters"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={text => handleheight(text)}
            />
          </View>

          <Text style={styles.text_footer}>Age</Text>

          <View style={styles.flexbox1}>
            <Icon name="sort-numeric-ascending" size={27} color="black" />
            <TextInput
              placeholder="Your Age"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={text => handleage(text)}
            />
          </View>

          <Text style={styles.text_footer}>Gender</Text>

          <View style={styles.picker}>
            <Picker
              selectedValue={data.gender}
              onValueChange={itemValue => handlegender(itemValue)}>
              <Picker.Item
                label="Select Gender"
                style={{fontSize: 18, fontWeight: 'bold'}}
                value="Select Gender"
              />

              <Picker.Item label="♂ Male" style={{fontSize: 18}} value="Male" />
              <Picker.Item
                label="♀ Female"
                style={{fontSize: 18}}
                value="Female"
              />
            </Picker>
          </View>

          <View style={styles.button1}>
            <TouchableOpacity onPress={validateform} style={styles.signIn}>
              <Text style={styles.textSign}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default UserDeatil;
