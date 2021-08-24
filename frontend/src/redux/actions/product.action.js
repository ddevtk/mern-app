import axios from 'axios';
import productActionType from '../type/product.type';

export const getProductPerPage = (limit, current) => async (dispatch) => {
  console.log(limit, current);
  dispatch({ type: productActionType.GET_ALL_PRODUCT_REQUEST });
  try {
    const {
      data: { allProduct, products },
    } = await axios(`/api/products?limit=${limit}&page=${current}`);
    dispatch({
      type: productActionType.GET_ALL_PRODUCT_SUCCESS,
      payload: { allProduct, products },
    });
  } catch (error) {
    dispatch({
      type: productActionType.GET_ALL_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getSingleProduct = (id) => async (dispatch) => {
  dispatch({ type: productActionType.GET_PRODUCT_DETAIL_REQUEST });
  try {
    const { data } = await axios(`/api/products/${id}`);
    dispatch({
      type: productActionType.GET_PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: productActionType.GET_PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateProduct = (productInfo) => async (dispatch, getState) => {
  console.log(productInfo);
  dispatch({ type: productActionType.UPDATE_PRODUCT_REQUEST });
  try {
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${productInfo.id}`,
      productInfo,
      config
    );
    console.log(data);
    dispatch({ type: productActionType.UPDATE_PRODUCT_SUCCESS });
  } catch (error) {
    dispatch({
      type: productActionType.UPDATE_PRODUCT_ERROR,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
