import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {getHeight, moderateScale} from '../../common/constants';
import {colors} from '../../themes/colors';
import CommonTextComponent from './CommonTextComponent';


export default function CommonButton({
  title,
  type = 'B16',
  color,
  onPress,
  containerStyle,
  style,
  bgColor = null,
  children,
  ...props
}) {
  return (
    <TouchableOpacity
      style={[
        localStyle.btnContainer,
        containerStyle,
        bgColor ? {backgroundColor: bgColor} : {backgroundColor: colors.primary},
      ]}
      onPress={onPress}
      {...props}>
      <CommonTextComponent type={type} style={style} color={color ? color : colors.white}>
        {title}
      </CommonTextComponent>
      {children}
    </TouchableOpacity>
  );
}

const localStyle = StyleSheet.create({
  btnContainer: {
    height: getHeight(58),
    borderRadius: moderateScale(25),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
