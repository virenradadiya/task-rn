import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

// custom imports
import {moderateScale} from '../../common/constants';


export default CommonKeyboardAvoiding = ({
  children,
  containerStyle,
  contentContainerStyle,
}) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? moderateScale(50) : undefined
      }
      style={[{flex : 1}, containerStyle]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        bounces={false}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
