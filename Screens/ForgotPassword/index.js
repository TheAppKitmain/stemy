const {SafeAreaView} = require('react-native');
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import {TextInput} from 'react-native-gesture-handler';
import CountryPicker from 'rn-country-picker';
import {CommonInput} from '../Utilities/Input';
import React, {useState} from 'react';
import {Colors} from '../Utilities/Colors';

function ForgotPassword(props) {
  const {navigation, loading} = props;

  const [Email, setEmail] = useState('');
  const [Password, setPassWord] = useState('');
  const [showpass, setShowpass] = useState(true);
  const [emailerror, setemailerror] = useState('');
  const [Passerror, setPasserror] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', marginHorizontal: 20}}>
        <Text
          style={styles.barText}
          onPress={() => navigation.navigate('Login')}>
          Back
        </Text>
        <Text style={styles.barCenterText}>Forgot Password</Text>
      </View>

      <View style={{flex: 1, flexDirection: 'column', marginTop: 20}}>
        <Text
          style={{
            fontSize: 20,
            marginLeft: 15,
            color: Colors.black,
            marginTop: 19,
            fontFamily: 'Viga-Regular',
          }}>
          Reset Password
        </Text>

        <Text
          style={{
            marginHorizontal: 18,
            color: 'grey',
            fontSize: 15,
            marginTop: 10,
            fontFamily: 'SF Pro Display Regular',
          }}>
          Please enter your email address and we will send instrutions on how to
          reset your password
        </Text>

        <Text style={styles.lableText}>Email address</Text>

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
        </View>

        <TouchableOpacity
          style={{
            height: 46,
            color: 'white',
            backgroundColor: '#262626',
            marginHorizontal: 14,
            justifyContent: 'center',
            borderRadius: 25,
            marginTop: 30,
          }}
          onPress={() => navigation.navigate('ResetPassword')}>
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: '800',
              color: 'white',
              fontSize: 15,
              fontFamily: 'Viga-Regular',
            }}>
            Send password link
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
            justifyContent: 'center',
          }}>
          <View>
            <Text
              style={{
                width: 180,
                textAlign: 'center',
                color: 'black',
                fontSize: 16,
                fontFamily: 'SF Pro Display Regular',
              }}>
              Don't have an account?
            </Text>
          </View>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 16,
              fontWeight: 600,
              textDecorationLine: 'underline',
              fontFamily: 'Viga-Regular',
            }}
            onPress={() => navigation.navigate('Register')}>
            Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ForgotPassword;
