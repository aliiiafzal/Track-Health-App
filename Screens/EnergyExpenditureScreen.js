import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import styles from '../Styles/EnergyExpenditureScreenStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
import {CheckOrientation} from '../Components/CheckOrientation';

const EnergyExpenditureScreen = ({route, navigation}) => {
  const {mybmr} = route.params;
  const orientation = CheckOrientation();
  //console.log(mybmr);
  const [activityLevel, setActivityLevel] = useState();
  //const [otherActivityLevel, setOtherActivityLevel] = useState();
  const [backgroundColor1, setBackgroundColor1] = useState();
  const [backgroundColor2, setBackgroundColor2] = useState();
  const [backgroundColor3, setBackgroundColor3] = useState();
  const [backgroundColor4, setBackgroundColor4] = useState();
  const [EE, setEE] = useState();
  const [OEE, setOEE] = useState('0');
  const [modalVisible, setModalVisible] = useState(false);
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
  const heightref = useRef();
  const ageref = useRef();

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

  const Calculate_BMR = () => {
    const heightInCm = data.height * 100;

    if (data.gender == 'Male') {
      const BMR = Number(
        66.5 + 13.75 * data.weight + 5.003 * heightInCm - 6.75 * data.age,
      ).toFixed(2);
      //console.log('BMR of Male ' + BMR);
      const Energy = activityLevel * BMR;
      const num = Number(Energy).toFixed(2);
      setOEE(num);
    } else if (data.gender == 'Female') {
      const BMR = Number(
        665.1 + 9.563 * data.weight + 1.85 * heightInCm - 4.676 * data.age,
      ).toFixed(2);
      //console.log('BMR of Female ' + BMR);
      const Energy = activityLevel * BMR;
      const num = Number(Energy).toFixed(2);
      setOEE(num);
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
      Calculate_BMR();
    }
  };

  const Check_Activity = text => {
    if (text == 'Normal') {
      setBackgroundColor1('lightblue');
      setBackgroundColor2('white');
      setBackgroundColor3('white');
      setBackgroundColor4('white');
      setActivityLevel('1.65');
      //setOtherActivityLevel('1.65');
    } else if (text == 'Not Active') {
      setBackgroundColor1('white');
      setBackgroundColor2('lightblue');
      setBackgroundColor3('white');
      setBackgroundColor4('white');
      setActivityLevel('1.4');
      //setOtherActivityLevel('1.4');
    } else if (text == 'Moderate') {
      setBackgroundColor1('white');
      setBackgroundColor2('white');
      setBackgroundColor3('lightblue');
      setBackgroundColor4('white');
      setActivityLevel('1.7');
      //setOtherActivityLevel('1.7');
    } else if (text == 'Very Active') {
      setBackgroundColor1('white');
      setBackgroundColor2('white');
      setBackgroundColor3('white');
      setBackgroundColor4('lightblue');
      setActivityLevel('2.3');
      //setOtherActivityLevel('2.3');
    }
  };

  const Calculate_Expenditure = () => {
    const Energy = activityLevel * mybmr;
    const num = Number(Energy).toFixed(2);
    setEE(num);
  };

  const Close_Modal = () => {
    setModalVisible(!modalVisible);
    setOEE('');
    setData({
      gender: 'Select Gender',
    });
  };

  if (orientation === 'PORTRAIT') {
    return (
      <View style={styles.conatiner}>
        <View style={styles.flexbox1}>
          <View style={styles.circle}>
            <Text style={styles.circletext}>BMR</Text>
            <Text style={styles.bmitxet}>{mybmr}</Text>
            <Text style={{textAlign: 'center', fontSize: 20, color: 'black'}}>
              TEE = {EE} KCal/day
            </Text>
            <Text style={{textAlign: 'center', fontSize: 15, color: 'black'}}>
              (Total Energy Expenditure)
            </Text>
          </View>
        </View>

        <View style={styles.flexbox2}>
          <Text style={styles.activitytext}>
            {' '}
            Select Physical Activity Level
          </Text>
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
          <TouchableOpacity
            onPress={() => Calculate_Expenditure()}
            disabled={!activityLevel}
            style={!activityLevel ? styles.button2 : styles.button1}>
            <Text style={styles.text}>Energy Expenditure</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalView}>
              <View style={{marginLeft: 300}}>
                <TouchableOpacity onPress={() => Close_Modal()}>
                  <Icon name="close-circle-outline" size={27} color="white" />
                </TouchableOpacity>
              </View>
              <Text style={styles.modalheading}>Your's TEE</Text>

              <ScrollView>
                <Text style={styles.text_footer}>Weight</Text>

                <View style={styles.flexbox5}>
                  <Icon name="weight-kilogram" size={30} color="black" />
                  <TextInput
                    placeholder="Weight in KG"
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    onChangeText={text => handleweight(text)}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      heightref.current.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <Text style={styles.text_footer}>Height</Text>

                <View style={styles.flexbox5}>
                  <Icon name="human-male-height" size={26} color="black" />
                  <TextInput
                    placeholder="Height in meters"
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    onChangeText={text => handleheight(text)}
                    ref={heightref}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      ageref.current.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <Text style={styles.text_footer}>Age</Text>

                <View style={styles.flexbox5}>
                  <Icon name="sort-numeric-ascending" size={27} color="black" />
                  <TextInput
                    placeholder="Your Age"
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    onChangeText={text => handleage(text)}
                    ref={ageref}
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

                    <Picker.Item
                      label="♂ Male"
                      style={{fontSize: 18}}
                      value="Male"
                    />
                    <Picker.Item
                      label="♀ Female"
                      style={{fontSize: 18}}
                      value="Female"
                    />
                  </Picker>
                </View>

                <View style={styles.flexbox6}>
                  <Text style={styles.OEE}>TEE = {OEE} KCal/day</Text>
                </View>

                <TouchableOpacity
                  onPress={() => validateform()}
                  style={styles.signIn}>
                  <Text style={styles.textSign}>Calculate</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </Modal>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            disabled={!activityLevel}
            style={!activityLevel ? styles.button2 : styles.button1}>
            <Text style={styles.text}>Calculate TEE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.Landscapeconatiner}>
        <View style={styles.Landscapeflexbox1}>
          <View style={styles.Landscapecircle}>
            <Text style={styles.Landscapecircletext}>BMR</Text>
            <Text style={styles.Landscapebmitxet}>{mybmr}</Text>
            <Text style={{textAlign: 'center', fontSize: 20, color: 'black'}}>
              TEE = {EE} KCal/day
            </Text>
            <Text style={{textAlign: 'center', fontSize: 15, color: 'black'}}>
              (Total Energy Expenditure)
            </Text>
          </View>
        </View>

        <View style={{flex: 0.6}}>
          <View style={styles.Landscapeflexbox2}>
            <Text style={styles.Landscapeactivitytext}>
              Select Physical Activity Level
            </Text>
          </View>

          <View style={styles.Landscapeflexbox3}>
            <TouchableOpacity
              onPress={() => Check_Activity('Normal')}
              style={[
                styles.Landscapebutton,
                {backgroundColor: backgroundColor1},
              ]}>
              <Image
                style={styles.Landscapeimage}
                source={require('../assets/Images/sportman.png')}
              />
              <Text style={styles.Landscapetext}>Normal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Check_Activity('Not Active')}
              style={[
                styles.Landscapebutton,
                {backgroundColor: backgroundColor2},
              ]}>
              <Image
                style={styles.Landscapeimage}
                source={require('../assets/Images/guy.png')}
              />
              <Text style={styles.Landscapetext}>Not Active</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.Landscapeflexbox3}>
            <TouchableOpacity
              onPress={() => Check_Activity('Moderate')}
              style={[
                styles.Landscapebutton,
                {backgroundColor: backgroundColor3},
              ]}>
              <Image
                style={styles.Landscapeimage}
                source={require('../assets/Images/man.png')}
              />
              <Text style={styles.Landscapetext}>Moderate</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Check_Activity('Very Active')}
              style={[
                styles.Landscapebutton,
                {backgroundColor: backgroundColor4},
              ]}>
              <Image
                style={styles.Landscapeimage}
                source={require('../assets/Images/businessman.png')}
              />
              <Text style={styles.Landscapetext}>Very Active</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.Landscapeflexbox4}>
            <TouchableOpacity
              onPress={() => Calculate_Expenditure()}
              disabled={!activityLevel}
              style={
                !activityLevel
                  ? styles.Landscapebutton2
                  : styles.Landscapebutton1
              }>
              <Text style={styles.Landscapetext}>Energy Expenditure</Text>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.LandscapemodalView}>
                <View style={{marginLeft: 300}}>
                  <TouchableOpacity onPress={() => Close_Modal()}>
                    <Icon name="close-circle-outline" size={27} color="white" />
                  </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.Landscapemodalheading}>Your's TEE</Text>

                  <Text style={styles.Landscapetext_footer}>Weight</Text>

                  <View style={styles.Landscapeflexbox5}>
                    <Icon name="weight-kilogram" size={30} color="black" />
                    <TextInput
                      placeholder="Weight in KG"
                      placeholderTextColor="#666666"
                      style={styles.LandscapetextInput}
                      autoCapitalize="none"
                      keyboardType="numeric"
                      onChangeText={text => handleweight(text)}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        heightref.current.focus();
                      }}
                      blurOnSubmit={false}
                    />
                  </View>

                  <Text style={styles.Landscapetext_footer}>Height</Text>

                  <View style={styles.Landscapeflexbox5}>
                    <Icon name="human-male-height" size={26} color="black" />
                    <TextInput
                      placeholder="Height in meters"
                      placeholderTextColor="#666666"
                      style={styles.LandscapetextInput}
                      autoCapitalize="none"
                      keyboardType="numeric"
                      onChangeText={text => handleheight(text)}
                      ref={heightref}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        ageref.current.focus();
                      }}
                      blurOnSubmit={false}
                    />
                  </View>

                  <Text style={styles.Landscapetext_footer}>Age</Text>

                  <View style={styles.Landscapeflexbox5}>
                    <Icon
                      name="sort-numeric-ascending"
                      size={27}
                      color="black"
                    />
                    <TextInput
                      placeholder="Your Age"
                      placeholderTextColor="#666666"
                      style={styles.LandscapetextInput}
                      autoCapitalize="none"
                      keyboardType="numeric"
                      onChangeText={text => handleage(text)}
                      ref={ageref}
                    />
                  </View>

                  <Text style={styles.Landscapetext_footer}>Gender</Text>

                  <View style={styles.Landscapepicker}>
                    <Picker
                      selectedValue={data.Landscapegender}
                      onValueChange={itemValue => handlegender(itemValue)}>
                      <Picker.Item
                        label="Select Gender"
                        style={{fontSize: 18, fontWeight: 'bold'}}
                        value="Select Gender"
                      />

                      <Picker.Item
                        label="♂ Male"
                        style={{fontSize: 18}}
                        value="Male"
                      />
                      <Picker.Item
                        label="♀ Female"
                        style={{fontSize: 18}}
                        value="Female"
                      />
                    </Picker>
                  </View>

                  <View style={styles.Landscapeflexbox6}>
                    <Text style={styles.LandscapeOEE}>
                      TEE = {OEE} KCal/day
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => validateform()}
                    style={styles.LandscapesignIn}>
                    <Text style={styles.LandscapetextSign}>Calculate</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </Modal>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              disabled={!activityLevel}
              style={
                !activityLevel
                  ? styles.Landscapebutton2
                  : styles.Landscapebutton1
              }>
              <Text style={styles.Landscapetext}>Calculate TEE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};

export default EnergyExpenditureScreen;
