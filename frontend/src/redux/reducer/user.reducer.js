import userActionType from '../type/user.type';

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionType.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case userActionType.LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case userActionType.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case userActionType.LOGOUT:
      return {};
    default:
      return state;
  }
};
