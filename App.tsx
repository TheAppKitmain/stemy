/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {NavigationContainer} from '@react-navigation/native';
const Stack = createNativeStackNavigator();
import Login from './Screens/Login'
import Register from './Screens/Register'
import VerifyOtp from './Screens/VerifyOtp'
import { navigationRef } from './RootNavigation';
import ForgotPassword from './Screens/ForgotPassword';
import ResetPassword from './Screens/ResetPassword';
import Dashboard from './Screens/Dashboard'
import Setting from './Screens/Setting'


function App(): JSX.Element {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView
    style={{flex:1}}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
         screenOptions={{
          gestureDirection: 'horizontal',
          animation:'slide_from_right',
          gestureEnabled:false
        }}>
          <Stack.Screen  
          name="Login" 
          component={Login}
          options={{headerShown: false}}/>

<Stack.Screen  
          name="Register" 
          component={Register}
          options={{headerShown: false}}/>

<Stack.Screen  
          name="VerifyOtp" 
          component={VerifyOtp}
          options={{headerShown: false}}/>

          
<Stack.Screen  
          name="ForgotPassword" 
          component={ForgotPassword}
          options={{headerShown: false}}/>

<Stack.Screen  
          name="ResetPassword" 
          component={ResetPassword}
          options={{headerShown: false}}/>

<Stack.Screen  
          name="Dashboard" 
          component={Dashboard}
          options={{headerShown: false}}/>

<Stack.Screen  
          name="Setting" 
          component={Setting}
          options={{headerShown: false}}/>

        </Stack.Navigator>
        </NavigationContainer>

      </SafeAreaProvider>
    
     
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
