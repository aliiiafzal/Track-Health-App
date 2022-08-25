import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import styles from '../Styles/SetGoalScreenStyles';
import {useNavigation} from '@react-navigation/native';

const SetGoalScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.conatiner}>
      <View style={styles.flexbox1}>
        <ImageBackground
          source={require('../assets/Images/target.gif')}
          resizeMode="contain"
          style={styles.gif}></ImageBackground>
      </View>

      <View style={styles.flexbox2}>
        <Text style={styles.activitytext}>Select Your Goal</Text>
      </View>

      <View style={styles.flexbox3}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('exercisegoal', {goal: 'Weight Gain'})
          }
          style={styles.button}>
          <Image
            style={styles.image}
            source={require('../assets/Images/gain-weight.png')}
          />
          <Text style={styles.text}>Weight Gain</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('exercisegoal', {goal: 'Weight Loss'})
          }
          style={styles.button}>
          <Image
            style={styles.image}
            source={require('../assets/Images/weight-loss.png')}
          />
          <Text style={styles.text}>Weight Loss</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flexbox3}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('exercisegoal', {goal: 'Muscles Gain'})
          }
          style={styles.button}>
          <Image
            style={styles.image}
            source={require('../assets/Images/muscle.png')}
          />
          <Text style={styles.text}>Muscles Gain</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('exercisegoal', {goal: 'Stay Fit'})
          }
          style={styles.button}>
          <Image
            style={styles.image}
            source={require('../assets/Images/fit.png')}
          />
          <Text style={styles.text}>Stay Fit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SetGoalScreen;
