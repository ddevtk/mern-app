import axios from 'axios';
import { orderActionType } from '../type/order.type';

export const addOrderItems = (order) => async (dispatch, getState) => {
  dispatch({ type: orderActionType.ADD_ORDER_REQUEST });
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

    const { data } = await axios.post(`/api/order/add`, order, config);
    dispatch({ type: orderActionType.ADD_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: orderActionType.ADD_ORDER_ERROR,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetail = (props) => async (dispatch, getState) => {
  dispatch({ type: orderActionType.ORDER_DETAIL_REQUEST });
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

    const { data } = await axios.get(`/api/order/${props.id}`, config);

    dispatch({
      type: orderActionType.ORDER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: orderActionType.ORDER_DETAIL_ERROR,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const emptyState = () => (dispatch) => {
  dispatch({ type: 'EMPTY_STATE' });
};
