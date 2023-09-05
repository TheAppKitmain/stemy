const {SafeAreaView} = require('react-native');
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';

import {Image, Text, TouchableOpacity, View, Alert} from 'react-native';
import styles from './style';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Loadingcomponent} from '../Utilities/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Setting(props) {
  let mToken;

  const {navigation, loading} = props;

  const [help, setHelp] = useState('');
  const [link, setLink] = useState('');
  const [verificationText, setVerificationText] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    retrieveData();
    console.log('user id... ', props.route.params.id);
  }, []);

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('mytoken');
      if (value !== null) {
        // We have data!!
        mToken = value;
        console.log('my user token ', mToken);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  async function clearData() {
    await AsyncStorage.clear();
  }

  const logout = async () => {
    setLoading(true);
    try {
      await fetch('https://stemy.io/backend/public/api/logout', {
        method: 'GET',
        headers: new Headers({
          Authorization: 'Bearer ' + mToken,
          'Content-Type': 'application/json',
        }),
      })
        .then(response => response.json())
        .then(response => {
          if (response.status === true) {
            setLoading(false);
            clearData();
            navigation.navigate('Login');
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

  const addVerification = async () => {
    if (link === '') {
      Alert.alert('please enter link');
    } else if (verificationText === '') {
      Alert.alert('please verification text');
    } else {
      this.RBSheetVerification.close();
      setLoading(true);
      const requestOptions = {
        method: 'POST',
        headers: new Headers({
          Authorization: 'Bearer ' + mToken,
          'Content-Type': 'application/json',
        }),

        body: JSON.stringify({
          user_id: props.route.params.id,
          placement_link: link,
          verification_reason: verificationText,
        }),
      };

      console.log('body data :' + JSON.stringify(requestOptions));
      try {
        await fetch(
          'https://stemy.io/backend/public/api/user_verification',
          requestOptions,
        )
          .then(response => response.json())
          .then(response => {
            if (response.status === true) {
              setLoading(false);
              Alert.alert(response.message);
            } else {
              setLoading(false);
              Alert.alert(response.message);
              console.log(response.message);
            }
          });
      } catch (error) {
        setLoading(false);
        console.error('Error', error);
      }
    }
  };

  const contactUs = async () => {
    try {
      const value = await AsyncStorage.getItem('mytoken');
      if (value !== null) {
        // We have data!!
        mToken = value;
        console.log('my user token ', mToken);
      }
    } catch (error) {
      // Error retrieving data
    }

    if (help === '') {
      Alert.alert('please enter message');
    } else {
      this.RBSheetHelp.close();
      console.log('tokennn.... ', mToken);
      setLoading(true);
      const requestOptions = {
        method: 'POST',
        headers: new Headers({
          Authorization: 'Bearer ' + mToken,
          'Content-Type': 'application/json',
        }),

        body: JSON.stringify({
          message: help,
        }),
      };

      console.log('body data :' + JSON.stringify(requestOptions));
      try {
        await fetch(
          'https://stemy.io/backend/public/api/contact_us',
          requestOptions,
        )
          .then(response => response.json())
          .then(response => {
            if (response.status === true) {
              setLoading(false);
              Alert.alert(response.message);
              console.log('Help response....:' + response.message);
            } else {
              setLoading(false);
              Alert.alert(response.message);
              console.log(response.message);
            }
          });
      } catch (error) {
        setLoading(false);
        console.error('Error', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          paddingBottom: 20,
          backgroundColor: '#ffffff',
        }}>
        <Text
          style={styles.barText}
          onPress={() => navigation.navigate('Profile')}>
          Back
        </Text>
        <Text style={styles.barCenterText}>Settings</Text>
      </View>

      <ScrollView bounces={false}>
        <View style={{flex: 1, flexDirection: 'column', marginTop: 20}}>
          <View
            style={{
              backgroundColor: '#ffffff',
              margin: 10,
              borderRadius: 8,
              flexDirection: 'column',
              paddingVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                marginStart: 15,
                marginVertical: 10,
                fontFamily: 'Viga-Regular',
              }}>
              Account
            </Text>
            <TouchableOpacity onPress={() => this.RBSheetVerification.open()}>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 10,
                  marginVertical: 5,
                }}>
                <Image
                  style={{
                    alignSelf: 'center',
                    width: 20,
                    height: 20,
                    resizeMode: 'cover',
                    alignContent: 'center',
                  }}
                  source={require('../Utilities/Images/seal_check.png')}
                />

                <Text
                  style={{
                    fontSize: 14,
                    alignSelf: 'center',
                    marginStart: 5,
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Request verification
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginVertical: 8,
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: 20,
                  height: 20,
                  resizeMode: 'cover',
                  alignContent: 'center',
                }}
                source={require('../Utilities/Images/lock.png')}
              />

              <Text
                style={{
                  fontSize: 14,
                  alignSelf: 'center',
                  marginStart: 5,
                  fontFamily: 'SF Pro Display Regular',
                }}>
                Privacy & Policy
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginVertical: 5,
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: 20,
                  height: 20,
                  resizeMode: 'cover',
                  alignContent: 'center',
                }}
                source={require('../Utilities/Images/eye_new.png')}
              />

              <Text
                style={{
                  fontSize: 14,
                  alignSelf: 'center',
                  marginStart: 5,
                  fontFamily: 'SF Pro Display Regular',
                }}>
                My Subscription
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#ffffff',
              margin: 10,
              borderRadius: 8,
              flexDirection: 'column',
              paddingVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                marginStart: 15,
                marginVertical: 10,
                fontFamily: 'Viga-Regular',
              }}>
              Content
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginVertical: 5,
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: 20,
                  height: 20,
                  resizeMode: 'cover',
                  alignContent: 'center',
                }}
                source={require('../Utilities/Images/ic_bell.png')}
              />

              <Text
                style={{
                  fontSize: 14,
                  alignSelf: 'center',
                  marginStart: 5,
                  fontFamily: 'SF Pro Display Regular',
                }}>
                Notification & sounds
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginVertical: 8,
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: 20,
                  height: 20,
                  resizeMode: 'cover',
                  alignContent: 'center',
                }}
                source={require('../Utilities/Images/translate.png')}
              />

              <Text
                style={{
                  fontSize: 14,
                  alignSelf: 'center',
                  marginStart: 5,
                  fontFamily: 'SF Pro Display Regular',
                }}>
                language
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginVertical: 5,
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: 20,
                  height: 20,
                  resizeMode: 'cover',
                  alignContent: 'center',
                }}
                source={require('../Utilities/Images/subtitles.png')}
              />

              <Text
                style={{
                  fontSize: 14,
                  alignSelf: 'center',
                  marginStart: 5,
                  fontFamily: 'SF Pro Display Regular',
                }}>
                Accessibility
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#ffffff',
              margin: 10,
              borderRadius: 8,
              flexDirection: 'column',
              paddingVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                marginStart: 15,
                marginVertical: 10,
                fontFamily: 'Viga-Regular',
              }}>
              Help & Support
            </Text>

            <TouchableOpacity onPress={() => this.RBSheetHelp.open()}>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 10,
                  marginVertical: 8,
                }}>
                <Image
                  style={{
                    alignSelf: 'center',
                    width: 20,
                    height: 20,
                    resizeMode: 'cover',
                    alignContent: 'center',
                  }}
                  source={require('../Utilities/Images/info.png')}
                />

                <Text
                  style={{
                    fontSize: 14,
                    alignSelf: 'center',
                    marginStart: 5,
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Help
                </Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginVertical: 5,
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: 20,
                  height: 20,
                  resizeMode: 'cover',
                  alignContent: 'center',
                }}
                source={require('../Utilities/Images/question.png')}
              />

              <Text
                style={{
                  fontSize: 14,
                  alignSelf: 'center',
                  marginStart: 5,
                  fontFamily: 'SF Pro Display Regular',
                }}>
                FAQs
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#ffffff',
              margin: 10,
              borderRadius: 8,
              flexDirection: 'column',
              paddingVertical: 10,
            }}>
            <TouchableOpacity onPress={() => logout()}>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 10,
                  marginVertical: 5,
                }}>
                <Image
                  style={{
                    alignSelf: 'center',
                    width: 20,
                    height: 20,
                    resizeMode: 'cover',
                    alignContent: 'center',
                  }}
                  source={require('../Utilities/Images/ic_logout.png')}
                />

                <Text
                  style={{
                    fontSize: 14,
                    alignSelf: 'center',
                    marginStart: 5,
                    color: '#ca483d',
                    fontFamily: 'SF Pro Display Regular',
                  }}>
                  Sign out
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginVertical: 8,
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: 20,
                  height: 20,
                  resizeMode: 'cover',
                  alignContent: 'center',
                }}
                source={require('../Utilities/Images/bin.png')}
              />

              <Text
                style={{
                  fontSize: 14,
                  alignSelf: 'center',
                  marginStart: 5,
                  fontFamily: 'SF Pro Display Regular',
                }}>
                Delete account
              </Text>
            </View>
          </View>
        </View>
        <Loadingcomponent isVisible={isLoading} />
      </ScrollView>

      {/* Verification sheet */}
      <RBSheet
        ref={ref => {
          this.RBSheetVerification = ref;
        }}
        height={550}
        openDuration={250}
        customStyles={{
          container: {
            backgroundColor: 'white',
            borderTopStartRadius: 18,
            borderTopEndRadius: 18,
            paddingVertical: 20,
          },
        }}>
        <View>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                marginTop: 6,
                width: '100%',
                textAlign: 'center',
                fontSize: 20,
                color: 'black',
                fontWeight: '600',
              }}>
              Verification
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: 'black',
                marginHorizontal: 20,
                marginTop: 20,
              }}>
              To verify your Stemy account, you must:
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                marginVertical: 15,
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: 20,
                  height: 20,
                  resizeMode: 'cover',
                  alignContent: 'center',
                }}
                source={require('../Utilities/Images/check_circle.png')}
              />

              <Text style={{fontSize: 14, alignSelf: 'center', marginStart: 5}}>
                Link your social media accounts
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: 20,
                  height: 20,
                  resizeMode: 'cover',
                  alignContent: 'center',
                }}
                source={require('../Utilities/Images/check_circle.png')}
              />

              <Text style={{fontSize: 14, alignSelf: 'center', marginStart: 5}}>
                Share a link to your placement
              </Text>
            </View>

            <TextInput
              style={{
                marginTop: 15,
                height: 45,
                width: '90%',
                alignSelf: 'center',
                borderRadius: 8,
                color: 'black',
                paddingHorizontal: 20,
                fontSize: 16,
                borderWidth: 0.3,
                borderColor: '#000000',
                backgroundColor: '#FAFAFA',
              }}
              placeholder="https://"
              placeholderTextColor="#9B9B9B"
              onChangeText={value => setLink(value)}></TextInput>

            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                marginVertical: 15,
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: 20,
                  height: 20,
                  resizeMode: 'cover',
                  alignContent: 'center',
                }}
                source={require('../Utilities/Images/check_circle.png')}
              />

              <Text style={{fontSize: 14, alignSelf: 'center', marginStart: 5}}>
                Tell us why you should be verified
              </Text>
            </View>

            <TextInput
              style={styles.input}
              multiline={true}
              placeholder="Start writing..."
              placeholderTextColor="#9B9B9B"
              onChangeText={value => setVerificationText(value)}></TextInput>

            <TouchableOpacity
              style={{
                height: 46,
                marginTop: 15,
                color: 'white',
                backgroundColor: '#DBAA4A',
                marginHorizontal: 18,
                justifyContent: 'center',
                borderRadius: 25,
              }}
              onPress={() => addVerification()}>
              <Text
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 16,
                  fontWeight: '500',
                  borderRadius: 50,
                  width: '90%',
                  paddingVertical: 12,
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>

      <RBSheet
        ref={ref => {
          this.RBSheetHelp = ref;
        }}
        height={550}
        openDuration={250}
        customStyles={{
          container: {
            backgroundColor: 'white',
            borderTopStartRadius: 18,
            borderTopEndRadius: 18,
            paddingVertical: 20,
          },
        }}>
        <View>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                marginTop: 6,
                width: '100%',
                textAlign: 'center',
                fontSize: 20,
                color: 'black',
                fontWeight: '600',
              }}>
              Help
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: 'black',
                marginHorizontal: 20,
                marginTop: 20,
              }}>
              Please let us know how we can help you
            </Text>

            <TextInput
              style={styles.inputHelp}
              multiline={true}
              placeholder="Type your question or problem"
              placeholderTextColor="#9B9B9B"
              onChangeText={value => setHelp(value)}></TextInput>

            <TouchableOpacity
              style={{
                height: 46,
                marginTop: 15,
                color: 'white',
                backgroundColor: '#DBAA4A',
                marginHorizontal: 18,
                justifyContent: 'center',
                borderRadius: 25,
              }}
              onPress={() => contactUs()}>
              <Text
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 16,
                  fontWeight: '500',
                  borderRadius: 50,
                  width: '90%',
                  paddingVertical: 12,
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
      <Loadingcomponent isVisible={isLoading} />
    </SafeAreaView>
  );
}

export default Setting;
