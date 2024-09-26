import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import { colors } from '../../themes/colors';

export default CommonSafeArea = ({children, ...props}) => {
  return (
    <SafeAreaView {...props} style={localStyles.root}>
      {children}
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    flex :1
  },
});
