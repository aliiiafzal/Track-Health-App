import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import styles from '../Styles/WorkoutCalculatorScreenStyles';
import ProgressCircle from 'react-native-progress-circle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../FirebaseConfig';
import {getDatabase, ref, set} from 'firebase/database';
import {useSelector, useDispatch} from 'react-redux';
import {CheckOrientation} from '../Components/CheckOrientation';

const WorkoutCalculatorScreen = ({route}) => {
  const orientation = CheckOrientation();
  const navigation = useNavigation();
  const {myworkoutbmi} = route.params;
  //console.log(myworkoutbmi);
  const checkemail = useSelector(state => state.email);
  //console.log(checkemail);
  const [resultText, setResultText] = useState('');
  const [running, setRunning] = useState();
  const [pushups, setPushps] = useState();
  const app = initializeApp(firebaseConfig);
  const dbref = getDatabase(app);
  const [data, setData] = React.useState({
    run: '',
    push: '',
    percent: '0',
    pushupPercentage: '0',
    isValidRunning: false,
    isValidPushups: false,
  });
  const pushupref = useRef();

  useEffect(() => {
    if (data.run > running || data.run < 0) {
      setData({
        run: '0',
      });
    } else if (data.push > pushups || data.push < 0) {
      setData({
        push: 0,
      });
    }
    Show_Result(myworkoutbmi);
  }, [myworkoutbmi, data.run, data.push]);

  const senddata = () => {
    try {
      const email = checkemail;
      const RunningCompleted = data.run;
      const TotalRunning = running;
      const PushupsCompleted = data.push;
      const TotalPushups = pushups;
      let today = new Date();
      let date =
        today.getDate() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getFullYear();
      var text = email.replace(/\./g, ',');
      set(ref(dbref, 'Workout/' + text), {
        email,
        RunningCompleted,
        TotalRunning,
        PushupsCompleted,
        TotalPushups,
        date,
      });
      Alert.alert('Your Workout Saved Successfully', null, [{text: 'Okay'}]);
      navigation.navigate('tabdrawer');
    } catch (error) {
      // Error retrieving data
    }
  };

  const Show_Result = bmicheck => {
    if (bmicheck < 18.5) {
      setResultText('Underweight');
      setRunning(2);
      setPushps(5);
    } else if (bmicheck >= 18.5 && bmicheck <= 24.9) {
      setResultText('Healthy');
      setRunning(3);
      setPushps(10);
    } else if (bmicheck >= 25 && bmicheck <= 29.9) {
      setResultText('Overweight');
      setRunning(5);
      setPushps(12);
    } else if (bmicheck >= 30 && bmicheck <= 39.9) {
      setResultText('Obese');
      setRunning(6);
      setPushps(5);
    } else {
      setResultText('');
    }
  };

  const handlerunning = val => {
    if (val.length != 0 && val <= running && val >= 0) {
      const percentage = (val / running) * 100;
      const num = Number(percentage).toFixed(0);
      setData({
        ...data,
        run: val,
        percent: num,
        isValidRunning: true,
      });
    } else {
      setData({
        ...data,
        run: val,
        percent: '0',
        isValidRunning: false,
      });
    }
  };

  const handlepushups = val => {
    if (val.length != 0 && val <= pushups && val >= 0) {
      const percentage = (val / pushups) * 100;
      const num = Number(percentage).toFixed(0);
      setData({
        ...data,
        push: val,
        pushupPercentage: num,
        isValidPushups: true,
      });
    } else {
      setData({
        ...data,
        push: val,
        pushupPercentage: '0',
        isValidPushups: false,
      });
    }
  };

  const validateform = () => {
    if (data.run.length == 0 || data.push.length == 0) {
      Alert.alert('ERROR!', 'Empty Field or Wrong Input.', [{text: 'Okay'}]);
      return;
    } else {
      senddata();
    }
  };

  if (orientation === 'PORTRAIT') {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.mainflex1}>
            <View style={styles.flexbox1}>
              <Text style={styles.heading}>
                My Health Status :: {resultText}
              </Text>
            </View>

            <View style={styles.flexbox2}>
              <ProgressCircle
                percent={data.percent}
                radius={90}
                borderWidth={8}
                color="#4F96BD"
                shadowColor="white"
                outerCircleStyle={styles.outcircle}
                bgColor="lightblue">
                <Icon name="run-fast" size={30} color="black" />
                <Text style={styles.circletext}>{data.percent} %</Text>
                <Text style={styles.circletext2}>of daily goal</Text>
              </ProgressCircle>
            </View>

            <View style={styles.flexbox3}>
              <TextInput
                placeholder=" enter running in Km"
                placeholderTextColor="#666666"
                style={styles.inputtext}
                keyboardType="numeric"
                onChangeText={text => handlerunning(text)}
                returnKeyType="next"
                onSubmitEditing={() => {
                  pushupref.current.focus();
                }}
                blurOnSubmit={false}
                autoFocus={true}
              />

              <Text style={styles.remainingtext}>{running - data.run}</Text>
            </View>

            <View style={styles.flexbox4}>
              <Text style={styles.text1}>Km You Ran Today</Text>

              <Text style={styles.text1}>Remaining Km</Text>
            </View>
          </View>

          <View style={styles.mainflex1}>
            <View style={styles.flexbox2}>
              <ProgressCircle
                percent={data.pushupPercentage}
                radius={90}
                borderWidth={8}
                color="#4F96BD"
                shadowColor="white"
                outerCircleStyle={styles.outcircle}
                bgColor="lightblue">
                <Icon name="arm-flex" size={30} color="black" />
                <Text style={styles.circletext}>{data.pushupPercentage} %</Text>
                <Text style={styles.circletext2}>of daily goal</Text>
              </ProgressCircle>
            </View>

            <View style={styles.flexbox3}>
              <TextInput
                placeholder="enter pushups"
                placeholderTextColor="#666666"
                style={styles.inputtext}
                keyboardType="numeric"
                onChangeText={text => handlepushups(text)}
                ref={pushupref}
                autoFocus={true}
              />

              <Text style={styles.remainingtext}>{pushups - data.push}</Text>
            </View>

            <View style={styles.flexbox4}>
              <Text style={styles.text1}>Pushups You Did Today</Text>

              <Text style={styles.text1}>Remaining Pushups</Text>
            </View>
          </View>

          <View style={styles.flexbox5}>
            <TouchableOpacity
              onPress={() => validateform()}
              disabled={!data.isValidRunning || !data.isValidPushups}
              style={
                !data.isValidRunning || !data.isValidPushups
                  ? styles.button2
                  : styles.button1
              }>
              <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={styles.Landscapecontainer}>
        <View style={styles.Landscapeflexbox1}>
          <Text style={styles.Landscapeheading}>
            My Health Status :: {resultText}
          </Text>
        </View>

        <View style={styles.Landscapemainflex1}>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
            }}>
            <View style={styles.Landscapeflexbox2}>
              <ProgressCircle
                percent={data.percent}
                radius={80}
                borderWidth={7}
                color="#4F96BD"
                shadowColor="white"
                outerCircleStyle={styles.outcircle}
                bgColor="lightblue">
                <Icon name="run-fast" size={30} color="black" />
                <Text style={styles.Landscapecircletext}>{data.percent} %</Text>
                <Text style={styles.Landscapecircletext2}>of daily goal</Text>
              </ProgressCircle>
            </View>

            <View style={styles.Landscapeflexbox3}>
              <TextInput
                placeholder="enter running in Km"
                placeholderTextColor="#666666"
                style={styles.Landscapeinputtext}
                keyboardType="numeric"
                onChangeText={text => handlerunning(text)}
                returnKeyType="next"
                onSubmitEditing={() => {
                  pushupref.current.focus();
                }}
                blurOnSubmit={false}
              />

              <Text style={styles.Landscapetext1}>Km You Ran Today</Text>
            </View>

            <View style={styles.Landscapeflexbox4}>
              <Text style={styles.Landscaperemainingtext}>
                {running - data.run}
              </Text>
              <Text style={styles.Landscapetext1}>Remaining Km</Text>
            </View>
          </View>

          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
            }}>
            <View style={styles.Landscapeflexbox2}>
              <ProgressCircle
                percent={data.pushupPercentage}
                radius={80}
                borderWidth={7}
                color="#4F96BD"
                shadowColor="white"
                outerCircleStyle={styles.outcircle}
                bgColor="lightblue">
                <Icon name="run-fast" size={30} color="black" />
                <Text style={styles.Landscapecircletext}>
                  {data.pushupPercentage} %
                </Text>
                <Text style={styles.Landscapecircletext2}>of daily goal</Text>
              </ProgressCircle>
            </View>

            <View style={styles.Landscapeflexbox3}>
              <TextInput
                placeholder="enter pushups"
                placeholderTextColor="#666666"
                style={styles.Landscapeinputtext}
                keyboardType="numeric"
                onChangeText={text => handlepushups(text)}
                ref={pushupref}
              />

              <Text style={styles.Landscapetext1}>Pushups You Did Today</Text>
            </View>

            <View style={styles.Landscapeflexbox4}>
              <Text style={styles.Landscaperemainingtext}>
                {pushups - data.push}
              </Text>
              <Text style={styles.Landscapetext1}>Remaining Pushups</Text>
            </View>
          </View>
        </View>

        <View style={styles.Landscapeflexbox5}>
          <TouchableOpacity
            onPress={() => validateform()}
            disabled={!data.isValidRunning || !data.isValidPushups}
            style={
              !data.isValidRunning || !data.isValidPushups
                ? styles.Landscapebutton2
                : styles.Landscapebutton1
            }>
            <Text style={styles.Landscapetext}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default WorkoutCalculatorScreen;
