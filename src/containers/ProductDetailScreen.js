import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';

import CSafeAreaView from '../components/common/CommonSafeArea';
import CHeader from '../components/common/CommonHeader';
import CommonTextComponent from '../components/common/CommonTextComponent';
import { moderateScale } from '../common/constants';
import { colors } from '../themes/colors';

export default function ProductDetailScreen({route}) {
  const item = route.params?.item;

   const DetailsRenderComponent = ({title, description}) => {
     return (
       <View style={localStyles.mainContainer}>
         <CommonTextComponent type={'B18'} style={localStyles.headerText}>
           {title + ': '}
         </CommonTextComponent>
         <CommonTextComponent type={'M16'}>
           {description}
         </CommonTextComponent>
       </View>
     );
   };
  
  const CDivider = () => {
    return (
      <View style={localStyles.dividerStyle } />
    )
  }
  return (
    <CSafeAreaView>
      <CHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CommonTextComponent type={'B24'} color={colors.primary} style={localStyles.mainContainer}>
          {item.title}
        </CommonTextComponent>
        <DetailsRenderComponent
          title={strings.productDescription}
          description={item?.description}
        />
        <CDivider />
        <DetailsRenderComponent
          title={strings.productMaterials}
          description={item?.material}
        />
        <CDivider />
        <DetailsRenderComponent
          title={strings.adjective}
          description={item?.adjective}
        />
        <CDivider />
        <DetailsRenderComponent
          title={strings.productPrice}
          description={'₹' + item?.price}
        />
      </ScrollView>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  headerText: {
    marginTop: moderateScale(10),
  },
  mainContainer: {
    marginHorizontal: moderateScale(20),
  },
  dividerStyle: {
    flex: 1,
    height: moderateScale(1),
    width: '90%',
    backgroundColor: colors.grayScale3,
    marginVertical: moderateScale(10),
    marginHorizontal: moderateScale(20),

  },
});