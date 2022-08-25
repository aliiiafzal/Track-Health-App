import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../Styles/HomeScreenStyles';
import {useNavigation} from '@react-navigation/native';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../FirebaseConfig';
import {getDatabase, ref, set, get, child} from 'firebase/database';
import {useSelector, useDispatch} from 'react-redux';
import SetGoalScreen from './SetGoalScreen';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const app = initializeApp(firebaseConfig);
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const dbRef = ref(getDatabase());
  const checkemail = useSelector(state => state.email);
  //console.log(checkemail);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Get_Data_firebase();
    });
    return unsubscribe;
  }, [navigation]);

  const Calculate_BMI = () => {
    const BMI = weight / (height * height);
    const check = parseFloat(BMI).toFixed(2);
    navigation.navigate('bmiscreen', {mybmi: check});
  };

  const Calculate_Workout_BMI = () => {
    const BMI = weight / (height * height);
    const num = parseFloat(BMI).toFixed(2);
    navigation.navigate('workoutcalculatorscreen', {myworkoutbmi: num});
  };

  const Calculate_Exercise_BMI = () => {
    const BMI = weight / (height * height);
    const num = parseFloat(BMI).toFixed(2);
    navigation.navigate('exercisesscreen', {myexercisebmi: num});
  };

  const Calculate_BMR = screen => {
    const heightInCm = height * 100;

    if (gender == 'Male') {
      const BMR = Number(
        66.5 + 13.75 * weight + 5.003 * heightInCm - 6.75 * age,
      ).toFixed(2);
      //console.log('BMR of Male ' + BMR);
      navigation.navigate(screen, {mybmr: BMR});
    } else if (gender == 'Female') {
      const BMR = Number(
        665.1 + 9.563 * weight + 1.85 * heightInCm - 4.676 * age,
      ).toFixed(2);
      //console.log('BMR of Female ' + BMR);
      navigation.navigate(screen, {mybmr: BMR});
    }
  };

  const Get_Data_firebase = text => {
    try {
      get(child(dbRef, `UserRecord`))
        .then(snapshot => {
          if (snapshot.exists()) {
            snapshot.forEach(child => {
              if (checkemail == child.val().email) {
                const weight = child.val().weight;
                const height = child.val().height;
                const age = child.val().age;
                const gender = child.val().gender;
                setWeight(weight);
                setHeight(height);
                setAge(age);
                setGender(gender);
                if (text == 'BMI') {
                  Calculate_BMI();
                } else if (text == 'BMR') {
                  Calculate_BMR('energyexpenditurescreen');
                } else if (text == 'WorkoutCalculator') {
                  Calculate_Workout_BMI();
                } else if (text == 'Exercises') {
                  Calculate_Exercise_BMI();
                } else if (text == 'macronutrient') {
                  Calculate_BMR('macronutrientscreen');
                }
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

  return (
    <View style={styles.conatainer}>
      <View style={styles.flexbox1}>
        <TouchableOpacity
          onPress={() => Get_Data_firebase('BMI')}
          style={styles.button}>
          <Image
            style={styles.image}
            source={require('../assets/Images/speedometer.png')}
          />
          <Text style={styles.text}>Body Mass Index</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Get_Data_firebase('macronutrient')}
          style={styles.button}>
          <Image
            style={styles.image}
            source={require('../assets/Images/macronutrient.png')}
          />
          <Text style={styles.text}>Macronutrients</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flexbox1}>
        <TouchableOpacity
          onPress={() => Get_Data_firebase('BMR')}
          style={styles.button}>
          <Image
            style={styles.image}
            source={require('../assets/Images/fire.png')}
          />
          <Text style={styles.text}>Energy Expenditure</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Get_Data_firebase('WorkoutCalculator')}
          style={styles.button}>
          <Image
            style={styles.image}
            source={require('../assets/Images/workout.png')}
          />
          <Text style={styles.text}>Workout Time Calculator</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flexbox1}>
        <TouchableOpacity
          onPress={() => navigation.navigate('setgoalscreen')}
          style={styles.button}>
          <Image
            style={styles.image}
            source={require('../assets/Images/goal.png')}
          />
          <Text style={styles.text}>Set Goal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Get_Data_firebase('Exercises')}
          style={styles.button}>
          <Image
            style={styles.image}
            source={require('../assets/Images/weights.png')}
          />
          <Text style={styles.text}>Exercises</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
