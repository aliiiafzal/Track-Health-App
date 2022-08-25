import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from '../Styles/MacronutrientScreenStyles';

const MacronutrientScreen = ({route, navigation}) => {
  const [backgroundColor1, setBackgroundColor1] = useState();
  const [backgroundColor2, setBackgroundColor2] = useState();
  const [backgroundColor3, setBackgroundColor3] = useState();
  const [backgroundColor4, setBackgroundColor4] = useState();
  const [protiens, setProtiens] = useState('0');
  const [carbs, setCarbs] = useState('0');
  const [fats, setFats] = useState('0');
  const [EE, setEE] = useState('0');
  const {mybmr} = route.params;
  //console.log(mybmr);

  const Check_Activity = text => {
    if (text == 'Normal') {
      setBackgroundColor1('lightblue');
      setBackgroundColor2('white');
      setBackgroundColor3('white');
      setBackgroundColor4('white');
      const Energy = 1.65 * mybmr;
      const num = Number(Energy).toFixed(2);
      setEE(num);
      const protiens = (Energy * 40) / 100 / 4;
      const carbs = (Energy * 25) / 100 / 4;
      const fats = (Energy * 35) / 100 / 9;
      const p = Number(protiens).toFixed(0);
      const c = Number(carbs).toFixed(0);
      const f = Number(fats).toFixed(0);
      setProtiens(p);
      setCarbs(c);
      setFats(f);
    } else if (text == 'Not Active') {
      setBackgroundColor1('white');
      setBackgroundColor2('lightblue');
      setBackgroundColor3('white');
      setBackgroundColor4('white');
      const Energy = 1.4 * mybmr;
      const num = Number(Energy).toFixed(2);
      setEE(num);
      const protiens = (Energy * 40) / 100 / 4;
      const carbs = (Energy * 25) / 100 / 4;
      const fats = (Energy * 35) / 100 / 9;
      const p = Number(protiens).toFixed(0);
      const c = Number(carbs).toFixed(0);
      const f = Number(fats).toFixed(0);
      setProtiens(p);
      setCarbs(c);
      setFats(f);
    } else if (text == 'Moderate') {
      setBackgroundColor1('white');
      setBackgroundColor2('white');
      setBackgroundColor3('lightblue');
      setBackgroundColor4('white');
      const Energy = 1.7 * mybmr;
      const num = Number(Energy).toFixed(2);
      setEE(num);
      const protiens = (Energy * 40) / 100 / 4;
      const carbs = (Energy * 25) / 100 / 4;
      const fats = (Energy * 35) / 100 / 9;
      const p = Number(protiens).toFixed(0);
      const c = Number(carbs).toFixed(0);
      const f = Number(fats).toFixed(0);
      setProtiens(p);
      setCarbs(c);
      setFats(f);
    } else if (text == 'Very Active') {
      setBackgroundColor1('white');
      setBackgroundColor2('white');
      setBackgroundColor3('white');
      setBackgroundColor4('lightblue');
      const Energy = 2.3 * mybmr;
      const num = Number(Energy).toFixed(2);
      setEE(num);
      const protiens = (Energy * 40) / 100 / 4;
      const carbs = (Energy * 25) / 100 / 4;
      const fats = (Energy * 35) / 100 / 9;
      const p = Number(protiens).toFixed(0);
      const c = Number(carbs).toFixed(0);
      const f = Number(fats).toFixed(0);
      setProtiens(p);
      setCarbs(c);
      setFats(f);
    }
  };
  return (
    <View style={styles.conatiner}>
      <ScrollView>
        <View style={styles.flexbox2}>
          <Text style={styles.activitytext}>Physical Activity Level</Text>
        </View>

        <View style={styles.flexbox3}>
          <TouchableOpacity
            onPress={() => Check_Activity('Normal')}
            style={[styles.button, {backgroundColor: backgroundColor1}]}>
            <Image
              style={styles.image}
              source={require('../assets/Images/sportman.png')}
            />
            <Text style={styles.text}>Normal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Check_Activity('Not Active')}
            style={[styles.button, {backgroundColor: backgroundColor2}]}>
            <Image
              style={styles.image}
              source={require('../assets/Images/guy.png')}
            />
            <Text style={styles.text}>Not Active</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.flexbox3}>
          <TouchableOpacity
            onPress={() => Check_Activity('Moderate')}
            style={[styles.button, {backgroundColor: backgroundColor3}]}>
            <Image
              style={styles.image}
              source={require('../assets/Images/man.png')}
            />
            <Text style={styles.text}>Moderate</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Check_Activity('Very Active')}
            style={[styles.button, {backgroundColor: backgroundColor4}]}>
            <Image
              style={styles.image}
              source={require('../assets/Images/businessman.png')}
            />
            <Text style={styles.text}>Very Active</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.flexbox4}>
          <Text style={styles.text1}>
            Your TDEE (Total Daily Energy Expenditure):
          </Text>
        </View>

        <View style={styles.flexbox5}>
          <Text style={styles.text2}>{EE} calories/day</Text>
        </View>

        <View style={styles.flexbox6}>
          <Text style={styles.text3}>Suggested macro based on your TDEE:</Text>
        </View>

        <View style={styles.flexbox4}>
          <Text style={styles.text4}>grams/day</Text>
        </View>

        <View style={styles.flexbox8}>
          <View style={styles.box}></View>

          <View style={styles.flexbox9}>
            <Text style={styles.text5}>Carbs</Text>
          </View>

          <View style={styles.flexbox9}>
            <Text style={styles.text6}>{carbs}</Text>
          </View>
        </View>

        <View style={styles.flexbox8}>
          <View style={styles.box1}></View>

          <View style={styles.flexbox9}>
            <Text style={styles.text5}>Protiens</Text>
          </View>

          <View style={styles.flexbox9}>
            <Text style={styles.text6}>{protiens}</Text>
          </View>
        </View>

        <View style={styles.flexbox8}>
          <View style={styles.box2}></View>

          <View style={styles.flexbox9}>
            <Text style={styles.text5}>Fats</Text>
          </View>

          <View style={styles.flexbox9}>
            <Text style={styles.text6}>{fats}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MacronutrientScreen;
