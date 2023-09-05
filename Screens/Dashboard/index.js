const {SafeAreaView} = require('react-native');
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import {TextInput} from 'react-native-gesture-handler';
import CountryPicker from 'rn-country-picker';
import {CommonInput} from '../Utilities/Input';
import React, {useEffect, useState} from 'react';
import {Colors} from '../Utilities/Colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EventRegister} from 'react-native-event-listeners';

import Discusions from '../Discussions';
import Post from '../Post';
import Messages from '../Messages';
import Liberaries from '../Liberaries';
import Profile from '../Profile';

const Tab = createBottomTabNavigator();

function Dashboard(props) {
  let myImage = null;

  const {navigation, loading} = props;

  const [profileUrl, setMyProfileUrl] = useState([]);

  const screenOptions = {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: '#ffffff',
      height: 90,
    },
    tabBarItemStyle: {
      backgroundColor: '#ffffff',
      margin: 5,
    },
  };

  useEffect(() => {
    let eventListner = EventRegister.addEventListener('profileImage', data => {
      console.log('IMAGEEEE', data);
      setMyProfileUrl(data);
    });
    return () => {
      EventRegister.removeEventListener(eventListner);
    };

    // setTimeout(() => {
    //   retrieveData();
    // }, 1000);
  }, []);

  const retrieveData = async () => {
    console.log('my profile image', ',mssdvmd v');
    try {
      const value = await AsyncStorage.getItem('myImage');
      if (value !== null) {
        // We have data!!
        myImage = value;
        setMyProfileUrl(myImage);
        console.log('my profile image', myImage);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  return (
    <Tab.Navigator initialRouteName="Profile" {...{screenOptions}}>
      <Tab.Screen
        name="Discusions"
        component={Discusions}
        options={{
          tabBarLabel: ({focused, color, size}) => (
            <Text style={{color: focused ? '#177E89' : color, fontSize: 12}}>
              Discussions
            </Text>
          ),

          tabBarIcon: ({size, color, focused}) => {
            return (
              <Image
                style={{width: 30, height: 30, resizeMode: 'contain'}}
                source={require('../Utilities/Images/ic_mic.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          tabBarLabel: ({focused, color, size}) => (
            <Text style={{color: focused ? '#177E89' : color, fontSize: 12}}>
              Post
            </Text>
          ),

          tabBarIcon: ({size, color, focused}) => {
            return (
              <Image
                style={{width: 30, height: 30, resizeMode: 'contain'}}
                source={require('../Utilities/Images/ic_plus.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarLabel: ({focused, color, size}) => (
            <Text style={{color: focused ? '#177E89' : color, fontSize: 12}}>
              Messages
            </Text>
          ),

          tabBarIcon: ({size, color, focused}) => {
            return (
              <Image
                style={{width: 30, height: 30, resizeMode: 'contain'}}
                source={require('../Utilities/Images/ic_chat.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Liberaries"
        component={Liberaries}
        options={{
          tabBarLabel: ({focused, color, size}) => (
            <Text
              style={{
                color: focused ? '#177E89' : color,
                fontSize: 12,
              }}>
              Liberaries
            </Text>
          ),

          tabBarIcon: ({size, color, focused}) => {
            return (
              <Image
                style={{width: 30, height: 30, resizeMode: 'contain'}}
                source={require('../Utilities/Images/ic_stack.png')}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({focused, color, size}) => (
            <Text style={{color: focused ? '#177E89' : color, fontSize: 12}}>
              Profile
            </Text>
          ),

          tabBarIcon: ({size, color, focused}) => {
            return (
              <Image
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: '#177E89',
                }}
                source={
                  profileUrl != null
                    ? {uri: profileUrl}
                    : require('../Utilities/Images/man.png')
                }
                //source={require('../Utilities/Images/man.png')}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default Dashboard;
