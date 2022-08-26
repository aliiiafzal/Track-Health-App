import React, {useState} from 'react';
import {
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../Styles/SplashScreenStyles';
import {CheckOrientation} from '../Components/CheckOrientation';

const SplashScreen = () => {
  const navigation = useNavigation();
  const orientation = CheckOrientation();
  //console.log(orientation);

  if (orientation === 'PORTRAIT') {
    return (
      <View style={styles.container}>
        <View style={styles.flexbox1}>
          <Text style={styles.title}>TRACK HEALTH</Text>
        </View>

        <View style={styles.flexbox2}>
          <ImageBackground
            source={require('../assets/Images/splash1.gif')}
            resizeMode="contain"
            style={styles.image}></ImageBackground>
        </View>

        <View style={styles.flexbox3}>
          <TouchableOpacity
            onPress={() => navigation.navigate('loginscreen')}
            style={styles.Button1}>
            <Text style={styles.TextStyle}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.Landscapecontainer}>
        <ScrollView>
          <View style={styles.Landscapeflexbox1}>
            <Text style={styles.Landscapetitle}>TRACK HEALTH</Text>
          </View>

          <View style={styles.Landscapeflexbox2}>
            <ImageBackground
              source={require('../assets/Images/splash1.gif')}
              resizeMode="contain"
              style={styles.Landscapeimage}></ImageBackground>
          </View>

          <View style={styles.Landscapeflexbox3}>
            <TouchableOpacity
              onPress={() => navigation.navigate('loginscreen')}
              style={styles.LandscapeButton1}>
              <Text style={styles.LandscapeTextStyle}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
};
export default SplashScreen;
