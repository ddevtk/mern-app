import { combineReducers } from 'redux';
import {
  productDetailReducer,
  productListReducer,
  updateProductReducer,
} from './reducer/product.reducer';
import { cartReducer } from './reducer/cart.reducer';
import {
  loginReducer,
  singleUserReducer,
  updateProfileReducer,
  updateUserReducer,
  userListReducer,
} from './reducer/user.reducer';
import {
  orderDetailReducer,
  orderListReducer,
  orderReducer,
} from './reducer/order.reducer';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: loginReducer,
  updateProfile: updateProfileReducer,
  updateUser: updateUserReducer,
  updateProduct: updateProductReducer,
  order: orderReducer,
  orderDetail: orderDetailReducer,
  orderList: orderListReducer,
  userList: userListReducer,
  user: singleUserReducer,
});

export default rootReducer;
