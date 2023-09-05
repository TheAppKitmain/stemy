const {SafeAreaView} = require('react-native');
import {Image, Text, TouchableOpacity, View, Alert} from 'react-native';
import styles from './style';
import React, {useEffect, useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Loadingcomponent} from '../Utilities/Loader';

function VerifyOtp(props) {
  const {navigation} = props;
  const [isLoading, setLoading] = useState(false);

  const [myOtp, setOtp] = useState('');

  useEffect(() => {
    //_retrieveData();
    const id = props.route.params.id;
    console.log('user id... ', id);
  }, []);

  const verifyOtp = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        otp: myOtp,
        id: props.route.params.id,
      }),
    };

    console.log('body data :' + JSON.stringify(requestOptions));
    try {
      await fetch(
        'https://stemy.io/backend/public/api/match_otp',
        requestOptions,
      )
        .then(response => response.json())
        .then(response => {
          if (response.status === true) {
            console.log(response.payload.token);
            navigation.navigate('Dashboard');
          } else {
            Alert.alert(response.message);
            console.log(response.message);
          }
        });
    } catch (error) {
      Alert.alert('Something went wrong.');
      console.error('Error', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', marginHorizontal: 20}}>
        <Text
          style={styles.barText}
          onPress={() => navigation.navigate('Register')}>
          Back
        </Text>
        <Text style={styles.barCenterText}>Verification</Text>
      </View>

      <View style={{flex: 1, flexDirection: 'column', marginTop: 20}}>
        <Text style={styles.lableText}>Enter verification code</Text>

        <Text
          style={{
            marginHorizontal: 18,
            color: 'black',
            fontSize: 15,
            marginTop: 10,
            fontFamily: 'SF Pro Display Regular',
          }}>
          We sent a 6-digit code to +44 7907 612422 please enter it below so we
          can verify you.{' '}
        </Text>

        <Text
          style={{
            fontSize: 13,
            color: 'black',
            marginHorizontal: 20,
            marginTop: 8,
            color: '#177E89',
            textDecorationLine: 'underline',
            fontFamily: 'SF Pro Display Regular',
          }}>
          Edit phone number
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: 'black',
            marginHorizontal: 20,
            marginTop: 8,
            color: 'grey',
            fontFamily: 'SF Pro Display Regular',
          }}>
          Varification Code
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 50,
            justifyContent: 'center',
          }}>
          <OTPInputView
            style={{width: '80%', height: 100}}
            pinCount={6}
            keyboardType={'phone-pad'}
            //code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            //onCodeChanged={code => setOtp(code)}
            autoFocusOnLoad={true}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              //setOtp(code);
              //verifyOtp();
              setLoading(true);
              const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  otp: code,
                  id: props.route.params.id,
                }),
              };

              console.log('body data :' + JSON.stringify(requestOptions));
              try {
                fetch(
                  'https://stemy.io/backend/public/api/match_otp',
                  requestOptions,
                )
                  .then(response => response.json())
                  .then(response => {
                    if (response.status === true) {
                      setLoading(false);
                      navigation.navigate('Login');
                    } else {
                      setLoading(false);
                      Alert.alert(response.message);
                      console.log(response.message);
                    }
                  });
              } catch (error) {
                setLoading(false);
                Alert.alert('Something went wrong.');
                console.error('Error', error);
              }
              console.log(`Code is ${code}, you are good to go!`);
            }}
          />
        </View>

        <Text
          style={{
            textAlign: 'center',
            fontSize: 15,
            color: 'black',
            marginHorizontal: 20,
            marginTop: 80,
            color: 'grey',
            fontFamily: 'SF Pro Display Regular',
          }}>
          Send another code in 00:05
        </Text>
      </View>
      <Loadingcomponent isVisible={isLoading} />
    </SafeAreaView>
  );
}

export default VerifyOtp;
