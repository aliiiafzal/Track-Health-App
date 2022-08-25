import React from 'react';
import {
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../Styles/SplashScreenStyles';

const SplashScreen = () => {
  const navigation = useNavigation();
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
};
export default SplashScreen;
