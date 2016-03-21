export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

import { CALL_API, getJSON } from 'redux-api-middleware'

export const cacheToken = (response) => {
  localStorage.setItem('token', response.token)
  return response
}

export const loginUser = (credentials) => ({
  [CALL_API]: {
    method: 'POST',
    body: credentials,
    endpoint: '/api/login',
    types: [
      LOGIN_REQUEST, 
      LOGIN_SUCCESS, 
      LOGIN_FAILURE
    ]
  }
})


// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

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

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE
  }
}

// Logs the user out
export const logoutUser = () => {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('token')
    dispatch(receiveLogout())
  } 
}


