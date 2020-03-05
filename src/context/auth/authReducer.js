import {
  LOG_IN,
  REGISTER,
  LOGIN_FAIL,
  REGISTER_FAIL,
  LOG_OUT,
  AUTH_ERROR,
  USER_LOADED,
  CLEAR_ERRORS,
  LOAD_STATE
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      localStorage.setItem('state', JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.name,
        role: action.payload.role,
        userId: action.payload.id
      };
    case LOG_IN:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case LOG_OUT:
    case AUTH_ERROR:
      localStorage.removeItem('state');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        loading: false,
        user: null,
        role: null
      };

    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload.data
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
