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
    const { data } = await axios.post(
      '/api/user/login',
      { email, password },
      config
    );
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

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: userActionType.REGISTER_REQUEST });
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/user/register',
      { name, email, password },
      config
    );
    dispatch({ type: userActionType.REGISTER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: userActionType.REGISTER_ERROR,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateProfile = (userInfo) => async (dispatch, getState) => {
  dispatch({ type: userActionType.UPDATE_REQUEST });
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

    const { data } = await axios.put(`/api/user/profile`, userInfo, config);
    dispatch({ type: userActionType.UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: userActionType.UPDATE_ERROR,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const refresh = () => (dispatch) => {
  dispatch({ type: userActionType.REFRESH });
};
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: userActionType.LOGOUT });
};
