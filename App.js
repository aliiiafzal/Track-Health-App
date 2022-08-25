import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './Redux/store';
import SplashScreen from './Screens/SplashScreen';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import UserDeatil from './Components/UserDeatil';
import HomeScreen from './Screens/HomeScreen';
import BMIScreen from './Screens/BMIScreen';
import EnergyExpenditureScreen from './Screens/EnergyExpenditureScreen';
import WorkoutCalculatorScreen from './Screens/WorkoutCalculatorScreen';
import SetGoalScreen from './Screens/SetGoalScreen';
import ExerciseGoal from './Components/ExerciseGoal';
import ExercisesScreen from './Screens/ExercisesScreen';
import MacronutrientScreen from './Screens/MacronutrientScreen';
import TabDrawer from './Components/TabDrawer';
import Profile from './Components/Profile';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="splashscreen"
            component={SplashScreen}
            options={{
              title: 'Track Health',
              headerStyle: {
                backgroundColor: '#4F96BD',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
            }}
          />

          <Stack.Screen
            name="loginscreen"
            component={LoginScreen}
            options={{
              title: 'Login',
              headerStyle: {
                backgroundColor: '#4F96BD',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
            }}
          />

          <Stack.Screen
            name="signupscreen"
            component={SignupScreen}
            options={{
              title: 'Signup',
              headerStyle: {
                backgroundColor: '#4F96BD',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
            }}
          />

          <Stack.Screen
            name="userdetail"
            component={UserDeatil}
            options={{
              title: 'Detail',
              headerStyle: {
                backgroundColor: '#4F96BD',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
            }}
          />

          {/* <Stack.Screen
            name="homescreen"
            component={HomeScreen}
            options={{
              title: 'Home',
            }}
          /> */}

          <Stack.Screen
            name="tabdrawer"
            component={TabDrawer}
            options={{
              title: 'Home',
              headerStyle: {
                backgroundColor: '#4F96BD',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
            }}
          />

          <Stack.Screen
            name="bmiscreen"
            component={BMIScreen}
            options={{
              title: 'Body Mass Index',
              headerStyle: {
                backgroundColor: '#4F96BD',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
            }}
          />

          <Stack.Screen
            name="energyexpenditurescreen"
            component={EnergyExpenditureScreen}
            options={{
              title: 'Basal Metabolic Rate',
              headerStyle: {
                backgroundColor: '#4F96BD',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
            }}
          />

          <Stack.Screen
            name="workoutcalculatorscreen"
            component={WorkoutCalculatorScreen}
            options={{
              title: 'Workout Calculator',
              headerStyle: {
                backgroundColor: '#4F96BD',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
            }}
          />

          <Stack.Screen
            name="setgoalscreen"
            component={SetGoalScreen}
            options={{
              title: 'Set Your Goal',
              headerStyle: {
                backgroundColor: '#4F96BD',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
            }}
          />

          <Stack.Screen
            name="exercisegoal"
            component={ExerciseGoal}
            options={{
              title: 'Exercise',
              headerStyle: {
                backgroundColor: '#4F96BD',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
            }}
          />

          <Stack.Screen
            name="exercisesscreen"
            component={ExercisesScreen}
            options={{
              title: 'Exercise',
              headerStyle: {
                backgroundColor: '#4F96BD',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
            }}
          />

          <Stack.Screen
            name="macronutrientscreen"
            component={MacronutrientScreen}
            options={{
              title: 'Mactronutrients',
              headerStyle: {
                backgroundColor: '#4F96BD',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
            }}
          />

          <Stack.Screen
            name="profile"
            component={Profile}
            options={{
              title: 'Your Profile',
              headerStyle: {
                backgroundColor: '#4F96BD',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
