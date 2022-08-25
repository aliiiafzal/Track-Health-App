import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from '../Styles/ProfileStyles';
import {useSelector} from 'react-redux';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../FirebaseConfig';
import {getDatabase, ref, set, get, child} from 'firebase/database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {
  getDownloadURL,
  getStorage,
  uploadBytes,
  ref as Ref,
} from 'firebase/storage';

const Profile = ({navigation}) => {
  const checkemail = useSelector(state => state.email);
  const dbRef = ref(getDatabase());
  const [username, setUserName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [path, setPath] = useState();
  const [url, setUrl] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const app = initializeApp(firebaseConfig);
  const dbref = getDatabase(app);

  //console.log(checkemail);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Get_Data_firebase();
    });
    return unsubscribe;
  }, [navigation]);

  const UploadPicToFirebase = async () => {
    try {
      const storage = getStorage();
      const storageRef = Ref(storage, 'Images/' + checkemail);
      const img = await fetch(path);
      const bytes = await img.blob();
      await uploadBytes(storageRef, bytes).then(x => {
        getDownloadURL(storageRef).then(x => {
          console.log(x);
          setUrl(x);
          try {
            var text = email.replace(/\./g, ',');
            const Image = x;
            set(ref(getDatabase(), 'UserRecord/' + text), {
              username,
              weight,
              height,
              age,
              gender,
              email,
              password,
              Image,
            });
            Alert.alert('Picture Updated Successfully', null, [{text: 'Okay'}]);
          } catch (error) {
            console.log(error);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const pickSingle = (cropit, circular = false, mediaType) => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
    })
      .then(img => {
        //console.log('received image', image);
        setPath(img.path);
        setTimeout(() => {
          UploadPicToFirebase();
        }, 1000);
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  };

  const Get_Data_firebase = () => {
    try {
      get(child(dbRef, `UserRecord`))
        .then(snapshot => {
          if (snapshot.exists()) {
            snapshot.forEach(child => {
              if (checkemail == child.val().email) {
                const username = child.val().username;
                const weight = child.val().weight;
                const height = child.val().height;
                const age = child.val().age;
                const gender = child.val().gender;
                const password = child.val().password;
                const email = child.val().email;
                const Image = child.val().Image;
                setUrl(Image);

                setUserName(username);
                setWeight(weight);
                setHeight(height);
                setAge(age);
                setGender(gender);
                setPassword(password);
                setEmail(email);
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
    <View style={styles.container}>
      <View style={styles.flexbox1}>
        <TouchableOpacity
          style={{borderWidth: 1, borderRadius: 200 / 2}}
          onPress={() => pickSingle(true, true)}>
          <Image
            source={{
              uri: url,
            }}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.email}>{checkemail}</Text>
      </View>

      <View style={styles.flexbox2}>
        <View style={styles.icon}>
          <Icon name="weight-kilogram" size={37} color="black" />
        </View>
        <View style={styles.weight}>
          <Text style={styles.weighttext}>Weight:</Text>
        </View>
        <View style={styles.getweight}>
          <Text style={styles.getweighttext}>{weight} Kg</Text>
        </View>
      </View>

      <View style={styles.flexbox2}>
        <View style={styles.icon}>
          <Icon name="human-male-height" size={37} color="black" />
        </View>
        <View style={styles.weight}>
          <Text style={styles.weighttext}>Height:</Text>
        </View>
        <View style={styles.getweight}>
          <Text style={styles.getweighttext}>{height} m</Text>
        </View>
      </View>

      <View style={styles.flexbox2}>
        <View style={styles.icon}>
          <Icon name="sort-numeric-ascending" size={37} color="black" />
        </View>
        <View style={styles.weight}>
          <Text style={styles.weighttext}>Age:</Text>
        </View>

        <View style={styles.getweight}>
          <Text style={styles.getweighttext}>{age} Years</Text>
        </View>
      </View>

      <View style={styles.flexbox2}>
        <View style={styles.icon}>
          <Icon name="gender-male" size={37} color="black" />
        </View>
        <View style={styles.weight}>
          <Text style={styles.weighttext}>Gender:</Text>
        </View>

        <View style={styles.getweight}>
          <Text style={styles.getweighttext}>{gender}</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;
