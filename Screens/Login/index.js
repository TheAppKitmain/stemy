const {SafeAreaView} = require('react-native');
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import {TextInput} from 'react-native-gesture-handler';
import CountryPicker from 'rn-country-picker';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loadingcomponent} from '../Utilities/Loader';
import {CommonInput} from '../Utilities/Input';
import {Colors} from '../Utilities/Colors';

function Login(props) {
  const {navigation, loading} = props;

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const [showpass, setShowpass] = useState(true);
  const [Passerror, setPasserror] = useState('');

  managePasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };

  const selectedValue = value => {
    setCountryCode(value);
  };

  useEffect(() => {
    _retrieveData();
  }, []);

  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      phone_number: countryCode + phone,
      password: password,
    }),
  };

  const validation = async () => {
    if (phone === '') {
      Alert.alert('please enter phone number');
      console.log('');
    } else if (password === '') {
      Alert.alert('please enter password');
    } else {
      loginApi();
    }
  };

  const loginApi = async () => {
    setLoading(true);
    console.log('body data :' + JSON.stringify(requestOptions));
    try {
      await fetch('https://stemy.io/backend/public/api/login', requestOptions)
        .then(response => response.json())
        .then(response => {
          if (response.status === true) {
            console.log('response data', response.payload.token);
            _storeData(response.payload.token);
            navigation.navigate('Dashboard');
            setLoading(false);
          } else {
            setLoading(false);
            Alert.alert(response.message);
            console.log(response.message);
          }
        });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  _storeData = async token => {
    try {
      await AsyncStorage.setItem('mytoken', token);
      console.log('saved token', token);
    } catch (error) {
      // Error saving data
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('mytoken');
      if (value !== null) {
        // We have data!!
        console.log('my auth token ', value);
        navigation.navigate('Dashboard');
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', marginHorizontal: 20}}>
        {/* <Text style={styles.barText}>Back</Text> */}
        <Text style={styles.barCenterText}>Sign in</Text>
        {/* <Text style={styles.barText}>Skip</Text> */}
      </View>

      <View style={{flex: 1, flexDirection: 'column', marginTop: 20}}>
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
            textContentType="password"
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
            fontFamily="SF Pro Display Regular"
          />
        </View>

        <Text
          style={{
            fontSize: 13,
            color: 'black',
            marginHorizontal: 20,
            marginTop: 8,
            color: '#177E89',
            textDecorationLine: 'underline',
            fontFamily: 'SF Pro Display Regular',
          }}
          onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot password?
        </Text>

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
              color: 'white',
              fontSize: 15,
              fontFamily: 'Viga-Regular',
            }}>
            Sign in
          </Text>
        </TouchableOpacity>

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
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
                color: 'black',
                fontFamily: 'SF Pro Display Regular',
              }}>
              or countinue with
            </Text>
          </View>
          <View
            style={{flex: 1, height: 1, backgroundColor: 'gray', marginEnd: 24}}
          />
        </View>

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
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
        </View>

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
                width: 160,
                textAlign: 'center',
                color: 'black',
                fontFamily: 'SF Pro Display Regular',
              }}>
              Don't have an account?
            </Text>
          </View>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 14,
              textDecorationLine: 'underline',
              fontFamily: 'Viga-Regular',
            }}
            onPress={() => navigation.navigate('Register')}>
            Register
          </Text>
        </View>
        <Loadingcomponent isVisible={isLoading} />
      </View>
    </SafeAreaView>
  );
}

export default Login;
