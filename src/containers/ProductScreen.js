import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

// Local Imports
import {showPopupWithOk, validateField} from '../utils/helpers';
import {moderateScale} from '../common/constants';
import CTextInput from '../components/common/CTextInput';
import CommonKeyboardAvoiding from '../components/common/CommonKeyboardAvoiding';
import CommonHeader from '../components/common/CommonHeader';
import CommonSafeArea from '../components/common/CommonSafeArea';
import strings from '../i18n/strings';
import CommonButton from '../components/common/CommonButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProductAction,
  updateProductAction,
} from '../redux/action/productAction';
import CommonLoader from '../components/common/CommonLoader';

export default function ProductScreen({navigation, route}) {
  const isEdit = route.params?.isEdit;
  const item = route.params?.item;

  const isLoading = useSelector(state => state?.products?.loader);

  const dispatch = useDispatch();
  const [itemTitle, setItemTitle] = useState(item?.title ?? '');
  const [itemDesc, setItemDesc] = useState(item?.description ?? '');
  const [itemPrice, setItemPrice] = useState(item?.price ?? '');
  const [itemMaterials, setItemMaterials] = useState(item?.material ?? '');
  const [itemAdjective, setItemAdjective] = useState(item?.adjective ?? '');
  const [itemTitleError, setItemTitleError] = useState('');
  const [itemDescError, setItemDescError] = useState('');
  const [itemPriceError, setItemPriceError] = useState('');
  const [itemMaterialsError, setItemMaterialsError] = useState('');
  const [itemAdjectiveError, setItemAdjectiveError] = useState('');

  const onChangeItemTitle = val => {
    const {msg} = validateField(val.trim(), strings.plsEnterProductTitle);
    setItemTitle(val);
    setItemTitleError(msg);
  };
  const onChangeItemDescription = val => {
    const {msg} = validateField(val.trim(), strings.plsEnterProductDescription);
    setItemDesc(val);
    setItemDescError(msg);
  };
  const onChangeItemPrice = val => {
    const {msg} = validateField(val.trim(), strings.plsEnterProductPrice);
    setItemPrice(val);
    setItemPriceError(msg);
  };
  const onChangeItemMaterials = val => {
    const {msg} = validateField(val.trim(), strings.plsEnterProductMaterials);
    setItemMaterials(val);
    setItemMaterialsError(msg);
  };
  const onChangeItemAdjective = val => {
    const {msg} = validateField(val.trim(), strings.plsEnterProductAdjective);
    setItemAdjective(val);
    setItemAdjectiveError(msg);
  };

  const onPressAddProduct = () => {
    if (
      !itemTitle ||
      !itemDesc ||
      !itemPrice ||
      !itemMaterials ||
      !itemAdjective ||
      itemTitleError ||
      itemDescError ||
      itemPriceError ||
      itemMaterialsError ||
      itemAdjectiveError
    ) {
      onChangeItemTitle(itemTitle);
      onChangeItemDescription(itemDesc);
      onChangeItemPrice(itemPrice);
      onChangeItemMaterials(itemMaterials);
      onChangeItemAdjective(itemAdjective);
      return;
    }

    if (isEdit) {
      dispatch(
        updateProductAction(
          item?.id,
          {
            id: item?.id,
            title: itemTitle,
            description: itemDesc,
            price: itemPrice,
            material: itemMaterials,
            adjective: itemAdjective,
          },
          successAdd,
        ),
      );
    } else {
      dispatch(
        addProductAction(
          {
            title: itemTitle,
            description: itemDesc,
            price: itemPrice,
            material: itemMaterials,
            adjective: itemAdjective,
          },
          successAdd,
        ),
      );
    }
  };
  console.log('onPressAddProduct');
  const successAdd = desc => {
    if (!isLoading) {
      showPopupWithOk(strings.appTitle, desc, () => navigation.goBack());
    }
  };

  return (
    <CommonSafeArea>
      <CommonHeader title={isEdit ? strings.editProduct : strings.addProduct} />
      <CommonKeyboardAvoiding contentContainerStyle={localStyles.mainContainer}>
        <CTextInput
          label={strings.productTitle}
          placeholder={strings.enterProductTitle}
          toGetTextFieldValue={onChangeItemTitle}
          _value={itemTitle}
          _errorText={itemTitleError}
        />
        <CTextInput
          label={strings.productDescription}
          placeholder={strings.enterProductDescription}
          toGetTextFieldValue={onChangeItemDescription}
          _value={itemDesc}
          multiline
          _errorText={itemDescError}
        />
        <CTextInput
          label={strings.productMaterials}
          placeholder={strings.enterProductMaterials}
          toGetTextFieldValue={onChangeItemMaterials}
          _value={itemMaterials}
          _errorText={itemMaterialsError}
        />
        <CTextInput
          label={strings.adjective}
          placeholder={strings.addProduct}
          toGetTextFieldValue={onChangeItemAdjective}
          _value={itemAdjective}
          _errorText={itemAdjectiveError}
        />
        <CTextInput
          label={strings.productPrice}
          placeholder={strings.enterProductPrice}
          toGetTextFieldValue={onChangeItemPrice}
          _value={itemPrice}
          keyBoardType={'numeric'}
          _errorText={itemPriceError}
        />
      </CommonKeyboardAvoiding>
      <CommonButton
        title={isEdit ? strings.save : strings.add}
        onPress={onPressAddProduct}
        containerStyle={localStyles.bottomBtnStyle}
      />
      {isLoading && <CommonLoader />}
    </CommonSafeArea>
  );
}

const localStyles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: moderateScale(20),
  },
  bottomBtnStyle: {
    margin: moderateScale(20),
  },
});
