import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCTS_LOADING,
  UPDATE_PRODUCT,
} from '../types';

const initialState = {
  products: [],
  addProduct: {},
  loader: false,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_LOADING:
      return {...state, loader: action.payload};
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loader: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        loader: false,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        addProduct: action.payload,
        loader: false,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product,
        ),
        loader: false,
      };
    default:
      return state;
  }
}
