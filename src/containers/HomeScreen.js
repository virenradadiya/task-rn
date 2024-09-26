import { StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {FlashList} from '@shopify/flash-list';

// Local Imports
import strings from '../i18n/strings';
import {AddIcon, DeleteIcon, EditIcon} from '../assets/svg';
import {getHeight, moderateScale} from '../common/constants';
import CommonHeader from '../components/common/CommonHeader';
import CommonSafeArea from '../components/common/CommonSafeArea';
import { showPopupWithOkAndCancel } from '../utils/helpers';
import { deleteProductAction, getProductAction } from '../redux/action/productAction';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import CommonTextComponent from '../components/common/CommonTextComponent';
import CommonLoader from '../components/common/CommonLoader';
import { SNav } from '../navigation/NavigationKeys';
import { colors } from '../themes/colors';

export default function HomeScreen({navigation}) {
  const iconScale = moderateScale(22);

  const productData = useSelector(state => state?.products?.products);
   const isLoading = useSelector(state => state?.products?.loader);
   const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && getProducts();
  }, [isFocused]);

  const getProducts = async () => {
    dispatch(getProductAction());
  };

  const onPressAddProduct = () =>
    navigation.navigate(SNav.ProductScreen, {isEdit: false});
  const onPressEditProduct = item =>
    navigation.navigate(SNav.ProductScreen, {isEdit: true, item});
  const onPressProduct = item =>
    navigation.navigate(SNav.ProductDetailScreen, {item});
  
   const onPressDelete = id => {
     showPopupWithOkAndCancel(
       strings.deleteProduct,
       strings.areYouSureToDeleteProduct,
       () => dispatch(deleteProductAction(id)),
     );
   };
  
    const RenderEmptyContainer = () => {
      return (
        <View style={localStyles.emptyContainer}>
          {!productData?.length && !isLoading && (
            <CommonTextComponent type={'B18'} align={'center'}>
              {strings.noProductsFound}
            </CommonTextComponent>
          )}
        </View>
      );
    };

  const productDetail = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressProduct(item)}
        style={localStyles.productContainer}>
        <CommonTextComponent type={'B20'} color={colors.primary}>
          {item.title}
        </CommonTextComponent>
        <CommonTextComponent type={'M16'} numberOfLines={2}>
          {item.description}
        </CommonTextComponent>
        <CommonTextComponent type={'S20'} numberOfLines={2}>
          {'₹'} {item?.price}
        </CommonTextComponent>
        <View style={localStyles.editAndDeleteIcons}>
          <TouchableOpacity
            onPress={() => onPressEditProduct(item)}
            style={[
              localStyles.iconStyle,
              {
                borderColor: colors.primary,
              },
            ]}>
            <EditIcon width={iconScale} height={iconScale} />
            <CommonTextComponent type={'B16'} color={colors.primary}>
              {strings.edit}
            </CommonTextComponent>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              localStyles.iconStyle,
              {
                borderColor: colors.alertColor,
              },
            ]}
            onPress={() => onPressDelete(item?.id)}>
            <DeleteIcon width={iconScale} height={iconScale} />
            <CommonTextComponent type={'B16'} color={colors.alertColor}>
              {strings.delete}
            </CommonTextComponent>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const AddIconBtn = () => {
    return (
      <TouchableOpacity
        onPress={onPressAddProduct}
        style={localStyles.addBtnStyle}>
        <AddIcon width={moderateScale(24)} height={moderateScale(24)} />
      </TouchableOpacity>
    );
  }

  return (
    <CommonSafeArea>
      <CommonHeader leftIcon title={strings.home} rightIcon={<AddIconBtn/>} />
      <View style={localStyles.mainContainer}>
        <FlashList
          data={productData}
          renderItem={productDetail}
          keyExtractor={(item, index) => item.id}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={5}
          contentContainerStyle={localStyles.productDetailContainer}
          ListEmptyComponent={<RenderEmptyContainer />}
        />
      </View>
      {isLoading && <CommonLoader />}
    </CommonSafeArea>
  );
}

const localStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  productContainer: {
    flex: 1,
    marginVertical: moderateScale(10),
    gap: moderateScale(7),
    borderRadius: moderateScale(16),
    borderWidth: moderateScale(1),
    padding: moderateScale(15),
    borderColor: colors.grayScale3,
  },
  priceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addBtnStyle: {
    backgroundColor: colors.primary,
    borderRadius: moderateScale(12),
    height: moderateScale(45),
    width: moderateScale(55),
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAndDeleteIcons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconStyle: {
    borderRadius: moderateScale(12),
    height: getHeight(40),
    flexDirection: 'row',
    gap: moderateScale(10),
    alignItems: 'center',
    borderWidth: moderateScale(1),
    width: '47%',
    justifyContent: 'center',
  },
  productDetailContainer: {
    paddingHorizontal: moderateScale(20),
  },
  emptyContainer: {
    padding: moderateScale(20),
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
