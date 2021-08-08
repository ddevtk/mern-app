import { combineReducers } from 'redux';
import {
  productDetailReducer,
  productListReducer,
} from './reducer/product.reducer';
import { cartReducer } from './reducer/cart.reducer';
import { loginReducer, updateProfileReducer } from './reducer/user.reducer';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: loginReducer,
  updateProfile: updateProfileReducer,
});

export default rootReducer;
