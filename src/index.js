import {View} from 'react-native';
import React from 'react';
import AppNavigator from './navigation';

export default function index() {
  return (
    <View style={{flex :1}}>
      <AppNavigator />
    </View>
  );
}
