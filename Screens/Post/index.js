import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import styles from './style';

function Post(props) {
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.barText}>Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}

export default Post;
