import {StyleSheet, View, ActivityIndicator, Modal} from 'react-native';
import React from 'react';

// custom imports
import {colors} from '../../themes/colors';

const CommonLoader = () => {
  return (
    <Modal transparent>
      <View style={localStyles.loaderStyle}>
        <ActivityIndicator size={'large'} color={colors.textColor} />
      </View>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  loaderStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#11111150',
  },
});

export default React.memo(CommonLoader);
