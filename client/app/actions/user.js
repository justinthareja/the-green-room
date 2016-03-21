export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

import { CALL_API, getJSON } from 'redux-api-middleware'

export const cacheToken = (token) => {
  localStorage.setItem('token', token)
}

export const loginUser = (credentials) => ({
  [CALL_API]: {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json'
    },
    endpoint: '/api/login',
    types: [
      LOGIN_REQUEST, 
      {
        type: LOGIN_SUCCESS,
        payload: async (action, state, res) => {
          res = await getJSON(res)
          cacheToken(res.token)
          return res
        }
      }, 
      LOGIN_FAILURE
    ]
  }
})

export const SET_USER_ERROR = 'SET_USER_ERROR'

export const updateUserError = (message) => ({
  type: SET_USER_ERROR,
  error: message
})

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  }
}

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

const logoutError = (message) => {
  return {
    type: LOGOUT_FAILURE,
    error: message
  }
}

// Logs the user out
export const logoutUser = () => {
  return (dispatch) => {
    dispatch(requestLogout())

    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
      dispatch(receiveLogout())
    } else {
      dispatch(logoutError('you are not logged in'))
    }
  } 
}


