import React, { useReducer } from 'react';
import axios from 'axios';
import authReducer from './authReducer';
import AuthContext from './AuthContext';
import setAuthToken from '../../utils/setAuthToken';
import {
  LOG_IN,
  REGISTER,
  LOGIN_FAIL,
  REGISTER_FAIL,
  LOG_OUT,
  USER_LOADED,
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOAD_STATE
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: null,
    user: null,
    role: null,
    userId: null,
    error: null
  };

  // Load User
  const loadUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        }
      };
      const res = await axios.get('http://localhost:5000/api/users', config);

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };

  // loadUserFromState
  const loadFromState = async () => {
    dispatch({
      type: LOAD_STATE
    });
  };

  // Register User
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post(
        'http://localhost:5000/api/users/register',
        formData,
        config
      );
      dispatch({
        type: REGISTER,
        payload: res.data
      });
      loadUser();
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL
      });
    }
  };

  // Login User
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post(
        'http://localhost:5000/api/users/login',
        formData,
        config
      );
      dispatch({
        type: LOG_IN,
        payload: res.data
      });
      loadUser();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response
      });
    }
  };

  // Logout
  const logout = async () => {
    localStorage.removeItem('token');
    dispatch({
      type: LOG_OUT
    });
  };

  const clearErrors = async () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        user: state.user,
        role: state.role,
        userId: state.userId,
        login,
        register,
        logout,
        loadUser,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
