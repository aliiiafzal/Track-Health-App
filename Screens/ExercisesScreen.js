import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from '../Styles/ExercisesScreenStyles';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../FirebaseConfig';
import {getDatabase, ref, onValue} from 'firebase/database';

const ExercisesScreen = ({route, navigation}) => {
  const {myexercisebmi} = route.params;
  const [resultText, setResultText] = useState('');
  const app = initializeApp(firebaseConfig);
  const dbRef = getDatabase();
  const [e1Name, setE1Name] = useState();
  const [e1No, setE1No] = useState();
  const [e1Image, setE1Image] = useState();
  const [e2Name, setE2Name] = useState();
  const [e2No, setE2No] = useState();
  const [e2Image, setE2Image] = useState();
  const [e3Name, setE3Name] = useState();
  const [e3No, setE3No] = useState();
  const [e3Image, setE3Image] = useState();

  useEffect(() => {
    Show_Result(myexercisebmi);
  }, [myexercisebmi]);

  const Get_Data_firebase = text => {
    try {
      return onValue(ref(dbRef, 'Exercises/' + text), snapshot => {
        const Exercise1Name =
          (snapshot.val() && snapshot.val().Exercise1Name) || '';
        const Exercise2Name =
          (snapshot.val() && snapshot.val().Exercise2Name) || '';
        const Exercise3Name =
          (snapshot.val() && snapshot.val().Exercise3Name) || '';
        const Exercise1No =
          (snapshot.val() && snapshot.val().Exercise1No) || '';
        const Exercise2No =
          (snapshot.val() && snapshot.val().Exercise2No) || '';
        const Exercise3No =
          (snapshot.val() && snapshot.val().Exercise3No) || '';
        const Exercise1Image =
          (snapshot.val() && snapshot.val().Exercise1Image) || '';
        const Exercise2Image =
          (snapshot.val() && snapshot.val().Exercise2Image) || '';
        const Exercise3Image =
          (snapshot.val() && snapshot.val().Exercise3Image) || '';

        setE1Name(Exercise1Name);
        setE1No(Exercise1No);
        setE1Image(Exercise1Image);
        setE2Name(Exercise2Name);
        setE2No(Exercise2No);
        setE2Image(Exercise2Image);
        setE3Name(Exercise3Name);
        setE3No(Exercise3No);
        setE3Image(Exercise3Image);
      });
    } catch (error) {
      // Error retrieving data
    }
  };

  const Show_Result = bmicheck => {
    if (bmicheck < 18.5) {
      setResultText('Underweight');
      Get_Data_firebase('Weight Gain');
    } else if (bmicheck >= 18.5 && bmicheck <= 24.9) {
      setResultText('Healthy');
      Get_Data_firebase('Stay Fit');
    } else if (bmicheck >= 25 && bmicheck <= 29.9) {
      setResultText('Overweight');
      Get_Data_firebase('Weight Loss');
    } else if (bmicheck >= 30 && bmicheck <= 39.9) {
      setResultText('Obese');
      Get_Data_firebase('Weight Loss');
    } else {
      setResultText('');
    }
  };

  return (
    <View style={styles.conatiner}>
      <ScrollView>
        <View style={styles.flexbox1}>
          <Text style={styles.heading}>My Health Status :: {resultText}</Text>
        </View>

        <View style={styles.flexbox1}>
          <Text style={styles.heading2}>
            Exercises According To My Health Status :
          </Text>
        </View>

        <View style={styles.flexbox2}>
          <ImageBackground
            source={{uri: e1Image}}
            resizeMode="contain"
            style={styles.backgroundgif}></ImageBackground>
        </View>

        <View style={styles.flexbox3}>
          <View style={styles.flexbox4}>
            <Text style={styles.exercisename}>{e1Name}</Text>
          </View>

          <View style={styles.flexbox5}>
            <Text style={styles.exerciseno}>{e1No}</Text>
          </View>
        </View>

        <View style={styles.flexbox2}>
          <ImageBackground
            source={{uri: e2Image}}
            resizeMode="contain"
            style={styles.backgroundgif}></ImageBackground>
        </View>

        <View style={styles.flexbox3}>
          <View style={styles.flexbox4}>
            <Text style={styles.exercisename}>{e2Name}</Text>
          </View>

          <View style={styles.flexbox4}>
            <Text style={styles.exerciseno}>{e2No}</Text>
          </View>
        </View>

        <View style={styles.flexbox2}>
          <ImageBackground
            source={{uri: e3Image}}
            resizeMode="contain"
            style={{height: 200, width: 200}}></ImageBackground>
        </View>

        <View style={styles.flexbox3}>
          <View style={styles.flexbox4}>
            <Text style={styles.exercisename}>{e3Name}</Text>
          </View>

          <View style={styles.flexbox4}>
            <Text style={styles.exerciseno}>{e3No}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ExercisesScreen;
