import React, { useReducer } from 'react';
import axios from 'axios';
import userReducer from './userReducer';
import UserContext from './UserContext';
import { GET_USERS, USERS_ERROR, DELETE_USER, ADD_USER } from '../types';

const UserState = props => {
  const initialState = {
    users: null,
    error: null
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // Get Users
  const getUsers = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    };
    try {
      const res = await axios.get('http://localhost:5000/api/admin/', config);
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: USERS_ERROR,
        dispatch: error
      });
    }
  };

  const deleteUser = async id => {
    const config = {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('token')
      }
    };
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/admin/${id}`,
        config
      );
      dispatch({
        type: DELETE_USER,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: USERS_ERROR,
        payload: error
      });
    }
  };

  const addUser = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "bearer " + localStorage.getItem("token")
      }
    };

    try {
      const res = await axios.post("http://localhost:5000/api/admin", user, config);
      getUsers();
      dispatch({
        type: ADD_USER,
        payload: res.data
      })
    } catch (error) {
      dispatch({
        type: USERS_ERROR,
        payload: error
      })
    }
  }

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        error: state.error,
        getUsers,
        deleteUser,
        addUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserState;
