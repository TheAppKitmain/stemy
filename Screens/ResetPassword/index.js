const {SafeAreaView} = require('react-native');
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import {TextInput} from 'react-native-gesture-handler';
import CountryPicker from 'rn-country-picker';
import {CommonInput} from '../Utilities/Input';
import React, {useState} from 'react';
import {Colors} from '../Utilities/Colors';

function ResetPassword(props) {
  const {navigation, loading} = props;

  const [Email, setEmail] = useState('');
  const [Password, setPassWord] = useState('');
  const [showpass, setShowpass] = useState(true);
  const [emailerror, setemailerror] = useState('');
  const [Passerror, setPasserror] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', marginHorizontal: 20}}>
        <Text style={styles.barText}>Back</Text>
        <Text style={styles.barCenterText}>Reset Password</Text>
      </View>

      <View style={{flex: 1, flexDirection: 'column', marginTop: 20}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            marginLeft: 15,
            color: Colors.black,
            marginTop: 19,
            fontFamily: 'Viga-Regular',
          }}>
          Create New Password
        </Text>

        <Text
          style={{
            marginHorizontal: 18,
            color: 'grey',
            fontSize: 15,
            marginTop: 10,
            fontFamily: 'SF Pro Display Regular',
          }}>
          Please enter new password
        </Text>

        <Text style={styles.lableText}>Password</Text>

        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 24,
            marginHorizontal: 15,
            height: 45,
            marginTop: 10,
          }}>
          <TextInput
            placeholderTextColor={'gray'}
            placeholder={'Enter password'}
            keyboardType={'phone-pad'}
            style={{
              color: 'black',
              paddingHorizontal: 20,
              flex: 1,
              fontFamily: 'SF Pro Display Regular',
            }}></TextInput>

          <Image
            style={{
              height: 20,
              width: 20,
              alignSelf: 'center',
              marginEnd: 20,
            }}
            source={require('../Utilities/Images/eye.png')}
          />
        </View>

        <Text
          style={{
            fontSize: 12,
            color: 'grey',
            marginHorizontal: 20,
            marginTop: 10,
            fontFamily: 'SF Pro Display Regular',
          }}>
          Must be at least 8 characters, include a capital letter, a number and
          a special characters.
        </Text>

        <Text style={styles.lableText}>Confirm Password</Text>

        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 24,
            marginHorizontal: 15,
            height: 45,
            marginTop: 10,
          }}>
          <TextInput
            placeholderTextColor={'gray'}
            placeholder={'Enter password'}
            keyboardType={'phone-pad'}
            style={{
              color: 'black',
              paddingHorizontal: 20,
              flex: 1,
            }}></TextInput>

          <Image
            style={{
              height: 20,
              width: 20,
              alignSelf: 'center',
              marginEnd: 20,
            }}
            source={require('../Utilities/Images/eye.png')}
          />
        </View>

        <TouchableOpacity
          style={{
            height: 46,
            color: 'white',
            backgroundColor: '#262626',
            marginHorizontal: 18,
            justifyContent: 'center',
            borderRadius: 25,
            marginTop: 30,
          }}
          onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: '800',
              color: 'white',
              fontSize: 15,
              fontFamily: 'Viga-Regular',
            }}>
            Update Password
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default ResetPassword;
