import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers/index.js'
import spots from '../data/spots.json'
import api from '../middleware/api'

const loggerMiddleware = createLogger()

export default () => {

  const store = createStore(
    rootReducer,
    applyMiddleware(
      api,
      thunkMiddleware,
      loggerMiddleware
    )
  )

  return store

}