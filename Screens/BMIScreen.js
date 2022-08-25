import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import styles from '../Styles/BMIScreenStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BMIScreen = ({route, navigation}) => {
  const {mybmi} = route.params;
  //console.log(mybmi);
  //const mybmi = '21';
  const [resultText, setResultText] = useState('');
  const [image, setImage] = useState();
  const [bmi, setBmi] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalResultText, setModalResultText] = useState('');
  const [modalImage, setModalImage] = useState();
  const [data, setData] = React.useState({
    weight: '',
    height: '',
  });

  useEffect(() => {
    //console.log(mybmi);
    Show_Result(mybmi);
    Show_Modal_Result(bmi);
  }, [mybmi, bmi]);

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

  const Show_Result = bmicheck => {
    if (bmicheck < 18.5) {
      setResultText('Underweight');
      setImage(require('../assets/Images/neutral.png'));
    } else if (bmicheck >= 18.5 && bmicheck <= 24.9) {
      setResultText('Healthy');
      setImage(require('../assets/Images/happiness.png'));
    } else if (bmicheck >= 25 && bmicheck <= 29.9) {
      setResultText('Overweight');
      setImage(require('../assets/Images/neutral.png'));
    } else if (bmicheck >= 30 && bmicheck <= 39.9) {
      setResultText('Obese');
      setImage(require('../assets/Images/sad-face.png'));
    } else {
      setResultText('');
    }
  };

  const Show_Modal_Result = checkbmi => {
    if (checkbmi < 18.5) {
      setModalResultText('Underweight');
      setModalImage(require('../assets/Images/neutral.png'));
    } else if (checkbmi >= 18.5 && checkbmi <= 24.9) {
      setModalResultText('Healthy');
      setModalImage(require('../assets/Images/happiness.png'));
    } else if (checkbmi >= 25 && checkbmi <= 29.9) {
      setModalResultText('Overweight');
      setModalImage(require('../assets/Images/neutral.png'));
    } else if (checkbmi >= 30 && checkbmi <= 39.9) {
      setModalResultText('Obese');
      setModalImage(require('../assets/Images/sad-face.png'));
    } else {
      setModalResultText('');
    }
  };

  const validateform = () => {
    if (
      data.weight.length == 0 ||
      data.height.length == 0 ||
      !data.isValidWeight ||
      !data.isValidHeight
    ) {
      Alert.alert('ERROR!', 'Empty Field or Wrong Input.', [{text: 'Okay'}]);
      return;
    } else {
      const BMI = data.weight / (data.height * data.height);
      const check = parseFloat(BMI).toFixed(2);
      setBmi(check);
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexbox1}>
        <ScrollView>
          <View style={styles.flexbox2}>
            <Image style={styles.image} source={image} />
          </View>

          <View style={styles.flexbox3}>
            <Text style={styles.text}>Your Body Mass Index (BMI) is: </Text>
          </View>

          <View style={styles.flexbox4}>
            <Text style={styles.bmitext}>{mybmi}</Text>
          </View>

          <View style={styles.flexbox5}>
            <Text style={styles.text}>
              According to the World Health Organization's (WHO) you belong to
              the category:
            </Text>
          </View>

          <View style={styles.flexbox4}>
            <Text style={styles.resulttext}>{resultText}</Text>
          </View>

          <Text style={styles.text_footer}>Weight</Text>

          <View style={styles.flexbox6}>
            <Icon name="weight-kilogram" size={30} color="black" />
            <TextInput
              placeholder="Weight in Kg"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={text => handleweight(text)}
            />
          </View>

          <Text style={styles.text_footer}>Height</Text>

          <View style={styles.flexbox6}>
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

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View>
                <View style={styles.modalView}>
                  <Text style={styles.modalheading}>Your's BMI</Text>

                  <Image style={styles.image} source={modalImage} />

                  <Text style={styles.modalText}>
                    Your Body Mass Index (BMI) is:{' '}
                  </Text>

                  <View style={styles.flexbox7}>
                    <Text style={styles.modaltextresult}>{bmi}</Text>
                  </View>

                  <Text style={styles.modalText}>
                    According to the World Health Organization's (WHO) you
                    belong to the category:
                  </Text>

                  <View style={styles.flexbox7}>
                    <Text style={styles.modaltextresult}>
                      {modalResultText}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    style={styles.signIn1}>
                    <Text style={styles.textSign}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => validateform()}
                style={styles.signIn}>
                <Text style={styles.textSign}>Calculate BMI</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default BMIScreen;
