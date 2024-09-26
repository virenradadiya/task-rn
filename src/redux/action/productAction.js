
import { apiData } from '../../api/api';
import { HOME_API } from '../../api/url';
import strings from '../../i18n/strings';
import { ADD_PRODUCT, DELETE_PRODUCT, GET_PRODUCTS, GET_PRODUCTS_LOADING, UPDATE_PRODUCT } from '../types';

// get product api action
export const getProductAction = () => {
  return async dispatch => {
    dispatch({type: GET_PRODUCTS_LOADING, payload: true});
    apiData(HOME_API, 'GET')
      .then(response => {
        console.log('res', response);
        dispatch({type: GET_PRODUCTS, payload: response});
      })
      .catch(error => dispatch({type: GET_PRODUCTS_LOADING, payload: false}));
  };
};

// delete product api action
export const deleteProductAction = productId => {
  return async dispatch => {
    dispatch({type: GET_PRODUCTS_LOADING, payload: true});
    apiData(`${HOME_API}/${productId}`, 'DELETE')
      .then(response => {
        dispatch({type: DELETE_PRODUCT, payload: response});
        return getProductAction()(dispatch);
      })
      .catch(error => dispatch({type: GET_PRODUCTS_LOADING, payload: false}));
  };
};

// add product api action
export const addProductAction = (product, successFunction) => {
  return async dispatch => {
    dispatch({type: GET_PRODUCTS_LOADING, payload: true});
    apiData(HOME_API, 'POST', product)
      .then(response => {
        dispatch({type: ADD_PRODUCT, payload: response});
        successFunction(strings.productAddedSuccessfully);
      })
      .catch(error => {
        dispatch({type: GET_PRODUCTS_LOADING, payload: false});
      });
  };
};

// update product api action
export const updateProductAction = (productId, product, successFunction) => {
  return async dispatch => {
    dispatch({type: GET_PRODUCTS_LOADING, payload: true});
    apiData(`${HOME_API}/${productId}`, 'PUT', product)
      .then(response => {
        dispatch({type: UPDATE_PRODUCT, payload: response});
        successFunction(strings.productUpdatedSuccessfully);
      })
      .catch(error => dispatch({type: GET_PRODUCTS_LOADING, payload: false}));
  };
};
