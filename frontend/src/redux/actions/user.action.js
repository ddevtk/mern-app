import axios from 'axios';
import userActionType from '../type/user.type';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: userActionType.LOGIN_REQUEST });
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = axios.post('/api/user/login', { email, password }, config);
    console.log(data);
    dispatch({ type: userActionType.LOGIN_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: userActionType.LOGIN_ERROR,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
