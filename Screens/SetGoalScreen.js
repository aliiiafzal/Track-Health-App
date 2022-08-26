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
import {CheckOrientation} from '../Components/CheckOrientation';

const SetGoalScreen = () => {
  const navigation = useNavigation();
  const orientation = CheckOrientation();

  if (orientation === 'PORTRAIT') {
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
  } else {
    return (
      <View style={styles.Landscapeconatiner}>
        <View
          style={{
            flex: 0.4,
            //backgroundColor: 'gray',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.Landscapeflexbox1}>
            <ImageBackground
              source={require('../assets/Images/target.gif')}
              resizeMode="contain"
              style={styles.Landscapegif}></ImageBackground>
          </View>
        </View>

        <View
          style={{
            flex: 0.6,
            //backgroundColor: 'lightblue',
            justifyContent: 'center',
            //alignItems: 'center',
          }}>
          <View style={styles.Landscapeflexbox2}>
            <Text style={styles.Landscapeactivitytext}>Select Your Goal</Text>
          </View>

          <View style={styles.Landscapeflexbox3}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('exercisegoal', {goal: 'Weight Gain'})
              }
              style={styles.Landscapebutton}>
              <Image
                style={styles.Landscapeimage}
                source={require('../assets/Images/gain-weight.png')}
              />
              <Text style={styles.Landscapetext}>Weight Gain</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('exercisegoal', {goal: 'Weight Loss'})
              }
              style={styles.Landscapebutton}>
              <Image
                style={styles.Landscapeimage}
                source={require('../assets/Images/weight-loss.png')}
              />
              <Text style={styles.Landscapetext}>Weight Loss</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.Landscapeflexbox3}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('exercisegoal', {goal: 'Muscles Gain'})
              }
              style={styles.Landscapebutton}>
              <Image
                style={styles.Landscapeimage}
                source={require('../assets/Images/muscle.png')}
              />
              <Text style={styles.Landscapetext}>Muscles Gain</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('exercisegoal', {goal: 'Stay Fit'})
              }
              style={styles.Landscapebutton}>
              <Image
                style={styles.Landscapeimage}
                source={require('../assets/Images/fit.png')}
              />
              <Text style={styles.Landscapetext}>Stay Fit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};

export default SetGoalScreen;
