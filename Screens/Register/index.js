const {SafeAreaView} = require('react-native');
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Linking,
  StyleSheet,
} from 'react-native';
import styles from './style';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import CountryPicker from 'rn-country-picker';
import {CommonInput} from '../Utilities/Input';
import React, {useState} from 'react';
import {Colors} from '../Utilities/Colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Loadingcomponent} from '../Utilities/Loader';

function Register(props) {
  const {navigation, loading} = props;

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [conPass, setConfirmPassword] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [isLoading, setLoading] = useState(false);

  const [showpass, setShowpass] = useState(true);
  const [Passerror, setPasserror] = useState('');

  const [showconpass, setShowconpass] = useState(true);
  const [Passconerror, setPassconerror] = useState('');

  const selectedValue = value => {
    setCountryCode(value);
  };

  const validation = async () => {
    if (phone === '') {
      Alert.alert('please enter phone number');
      console.log('');
    } else if (password === '') {
      Alert.alert('please enter password');
    } else if (conPass === '') {
      Alert.alert('please enter confirm password');
    } else if (conPass !== password) {
      Alert.alert('Password and confirm password does not match.');
    } else {
      registerApi();
    }
  };

  const registerApi = async () => {
    setLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        phone_number: countryCode + phone,
        password: password,
        password_confirmation: conPass,
      }),
    };

    console.log('body data :' + JSON.stringify(requestOptions));
    try {
      await fetch('https://stemy.io/backend/public/api/sign_up', requestOptions)
        .then(response => response.json())
        .then(response => {
          if (response.status === true) {
            setLoading(false);
            //console.log(response.payload.token);
            navigation.navigate('VerifyOtp', {id: response.id});
          } else {
            setLoading(false);
            Alert.alert(response.message);
            console.log(response.message);
          }
        });
    } catch (error) {
      setLoading(false);
      Alert.alert('Please enter valid number');
      console.error('Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 30,
          paddingTop: 10,
          paddingBottom: 20,
        }}>
        <Text
          style={styles.barText}
          onPress={() => navigation.navigate('Login')}>
          Back
        </Text>
        <Text style={styles.barCenterText}>Register</Text>
        {/* <Text style={styles.barText}>Skip</Text> */}
      </View>

      <ScrollView bounces={false}>
        <View>
          <View style={{flexDirection: 'column', marginTop: 10}}>
            <Text style={styles.lableText}>Phone number</Text>

            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 24,
                marginHorizontal: 15,
                height: 48,
                marginTop: 10,
              }}>
              <CountryPicker
                containerStyle={styles.pickerStyle}
                pickerTitleStyle={styles.pickerTitleStyle}
                selectedCountryTextStyle={styles.selectedCountryTextStyle}
                countryNameTextStyle={styles.countryNameTextStyle}
                countryFlagStyle={styles.flagStyle}
                countryCode={'1'}
                searchBarContainerStyle={styles.searchBarBg}
                backButtonImage={require('../Utilities/Images/left.png')}
                searchButtonImage={require('../Utilities/Images/zoom.png')}
                selectedValue={selectedValue}></CountryPicker>

              <TextInput
                value={phone}
                placeholderTextColor={'gray'}
                placeholder={'Enter phone number'}
                keyboardType={'phone-pad'}
                style={{
                  color: 'black',
                  width: '70%',
                  fontFamily: 'SF Pro Display Regular',
                }}
                onChangeText={value => setPhone(value)}></TextInput>
            </View>

            <Text style={styles.lableText}>Email</Text>

            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 24,
                marginHorizontal: 15,
                height: 48,
                marginTop: 10,
              }}>
              <TextInput
                value={email}
                placeholderTextColor={'gray'}
                placeholder={'Enter email'}
                keyboardType={'email-address'}
                style={{
                  color: 'black',
                  width: '100%',
                  paddingHorizontal: 20,
                  fontFamily: 'SF Pro Display Regular',
                }}
                onChangeText={value => setEmail(value)}></TextInput>
            </View>

            <Text style={styles.lableText}>Password</Text>

            <View>
              <CommonInput
                icolor={Colors.black}
                isicon={'yes'}
                placeholder={'********'}
                placeholderTextColor="#000000"
                size={21}
                value={password}
                secureTextEntry={showpass}
                onChangeText={text => setPassword(text)}
                eye={'YES'}
                eyename={showpass === false ? 'eye' : 'eye-with-line'}
                hidepass={() => setShowpass(!showpass)}
                errorspacing={Passerror === '' ? 'no' : 'yes'}
                error={Passerror}
                width={'70%'}
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
              Must be at least 8 characters, include a capital letter, a number
              and a special characters.
            </Text>

            <Text style={styles.lableText}>Confirm Password</Text>

            <View>
              <CommonInput
                icolor={Colors.black}
                isicon={'yes'}
                placeholder={'********'}
                placeholderTextColor="#000000"
                size={21}
                value={conPass}
                secureTextEntry={showconpass}
                onChangeText={text => setConfirmPassword(text)}
                eye={'YES'}
                eyename={showconpass === false ? 'eye' : 'eye-with-line'}
                hidepass={() => setShowconpass(!showconpass)}
                errorspacing={Passerror === '' ? 'no' : 'yes'}
                error={Passconerror}
                width={'70%'}
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
              onPress={validation}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontWeight: '800',
                  color: 'white',
                  fontSize: 15,
                  fontFamily: 'Viga-Regular',
                }}>
                Register
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                marginTop: 14,
                marginHorizontal: 20,
                fontFamily: 'SF Pro Display Regular',
              }}>
              By countinuing, you are agreeing to our Terms and Conditions and
              Privacy Policy
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: 'gray',
                  marginStart: 24,
                }}
              />
              <View>
                <Text
                  style={{
                    width: 160,
                    textAlign: 'center',
                    color: 'grey',
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  or register with
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: 'gray',
                  marginEnd: 24,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 24,
                  height: 45,
                  marginTop: 10,
                  width: 70,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginStart: 20,
                }}>
                <Image
                  style={{height: 20, width: 20, alignSelf: 'center'}}
                  source={require('../Utilities/Images/ic_email.png')}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 24,
                  height: 45,
                  marginTop: 10,
                  width: 70,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 20,
                }}>
                <Image
                  style={{height: 20, width: 20, alignSelf: 'center'}}
                  source={require('../Utilities/Images/ic_gmail.png')}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 24,
                  height: 45,
                  marginTop: 10,
                  width: 70,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginEnd: 20,
                }}>
                <Image
                  style={{height: 20, width: 20, alignSelf: 'center'}}
                  source={require('../Utilities/Images/ic_apple.png')}
                />
              </View>

              {/* <View
              style={{
                flex: 1,
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 24,
                height: 45,
                marginTop: 10,
                width: 70,
                alignItems: 'center',
                justifyContent: 'center',
                marginEnd: 20,
              }}>
              <Image
                style={{height: 20, width: 20, alignSelf: 'center'}}
                source={require('../Utilities/Images/ic_facebook.png')}
              />
            </View> */}
            </View>

            {/* <CommonInput
              showlabel="yes"
              placeholder={'Enter password'}
              placeholderTextColor={'gray'}
              txtlabel="Password"
              labeltype="Fontisto"
              label="locked"
              keyboardType="email-address"
              eye={'YES'}
              eyename={showpass === false ? 'eye' : 'eye-with-line'}
              icolor={Colors.mainColor}
              errorspacing={Passerror === '' ? 'no' : 'yes'}
            /> */}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 30,
                marginBottom: 20,
                justifyContent: 'center',
                marginBottom: 60,
              }}>
              <View>
                <Text
                  style={{
                    width: 160,
                    textAlign: 'center',
                    color: 'black',
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Already have an accont?
                </Text>
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 14,
                  fontWeight: 600,
                  textDecorationLine: 'underline',
                  fontFamily: 'Viga-Regular',
                }}
                onPress={() => navigation.navigate('Login')}>
                Sign in
              </Text>
            </View>
            <Loadingcomponent isVisible={isLoading} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Register;
