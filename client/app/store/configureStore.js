import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers/index.js'
import spots from '../data/spots.json'

const loggerMiddleware = createLogger()

export default () => {

  const store = createStore(
    rootReducer,
    applyMiddleware(
      loggerMiddleware, 
      thunkMiddleware
    )
  )

  return store

}