import { combineReducers } from 'redux';
import {
  productDetailReducer,
  productListReducer,
} from './reducer/product.reducer';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
});

export default rootReducer;
