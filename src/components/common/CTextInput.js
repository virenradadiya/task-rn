import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

// custom imports
import {getHeight, moderateScale} from '../../common/constants';
import {colors} from '../../themes/colors';
import typography from '../../themes/typography';
import CommonTextComponent from './CommonTextComponent';

export default CTextInput = props => {
  let {
    _value,
    label,
    inputContainerStyle,
    inputBoxStyle,
    toGetTextFieldValue,
    placeHolder,
    _maxLength,
    _editable = true,
    labelStyle,
    multiline,
    keyBoardType,
    _errorText,
  } = props;

  return (
    <View style={localStyle.mainContainer}>
      {label && (
        <View style={[localStyle.labelContainer, labelStyle]}>
          <View style={{flexDirection: 'row'}}>
            <CommonTextComponent style={localStyle.labelText} type={'b18'}>
              {label}
            </CommonTextComponent>
          </View>
        </View>
      )}
      <View
        style={[
          localStyle.inputContainer,
          {
            borderColor: colors.grayScale3,
            height: multiline ? moderateScale(75) : moderateScale(50),
          },
          inputContainerStyle,
        ]}>
        <TextInput
          value={_value}
          maxLength={_maxLength}
          defaultValue={_value}
          placeholderTextColor={colors.placeHolderColor}
          onChangeText={toGetTextFieldValue}
          multiline={multiline}
          keyboardType={keyBoardType}
          placeholder={placeHolder}
          style={[
            localStyle.inputBox,
            {color: colors.textColor},
            {height: multiline ? getHeight(75) : getHeight(50)},
            inputBoxStyle,
            _editable == false && {color: colors.placeHolderColor},
          ]}
          {...props}
        />
      </View>
      {_errorText && _errorText != '' && (
        <CommonTextComponent
        style={{
          ...localStyle.errorText,
          color: colors.alertColor,
        }}
        >
          {_errorText}
        </CommonTextComponent>
      )}
    </View>
  );
};

const localStyle = StyleSheet.create({
  labelText: {
    textAlign: 'left',
    opacity: 0.9,
  },
  inputBox: {
    ...typography.fontSizes.f16,
    ...typography.fontWeights.Regular,
    paddingHorizontal: moderateScale(10),
    flex: 1,
  },
  inputContainer: {
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: moderateScale(5),
  },
  labelContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(5),
  },
  errorText: {
    textAlign: 'left',
    ...typography.fontSizes.f12,
    marginTop: moderateScale(5),
    marginLeft: moderateScale(10),
  },
  leftIconStyle: {
    paddingLeft: moderateScale(10),
  },
  rightIconStyle: {
    marginRight: moderateScale(15),
  },
  mainContainer: {
    marginVertical: moderateScale(10),
  },
  errorText: {
    ...typography.fontSizes.f12,
   marginTop : moderateScale(5),
    marginLeft : moderateScale(5)
  },
});
