import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

// Local Imports
import {moderateScale} from '../../common/constants';
import {BackIcon} from '../../assets/svg';
import CommonTextComponent from './CommonTextComponent';
import {colors} from '../../themes/colors';

export default function CommonHeader(props) {
  const {title, leftIcon = false, rightIcon} = props;
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  return (
    <View style={localStyles.container}>
      <View style={localStyles.innerContainer}>
        {!!leftIcon ? (
          leftIcon
        ) : (
          <TouchableOpacity style={localStyles.backIconStyle} onPress={goBack}>
            <BackIcon width={moderateScale(24)} height={moderateScale(24)} />
          </TouchableOpacity>
        )}
        <CommonTextComponent
          numberOfLines={1}
          align={'center'}
          color={colors.primary}
          style={localStyles.backIconStyle}
          type={'B24'}>
          {title}
        </CommonTextComponent>
        <View>{!!rightIcon && rightIcon}</View>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15),
  },
  backIconStyle: {
    paddingRight: moderateScale(10),
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
