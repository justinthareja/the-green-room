import { REQUEST_CONDITIONS, RECEIVE_CONDITIONS } from '../actions/conditions'

const conditionsById = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_CONDITIONS:
    case REQUEST_CONDITIONS:
      let nextState = {}
      nextState[action.spotId] = conditions(state[action.spotId], action) 
      return Object.assign({}, state, nextState)
    default:
      return state
  }
}

const conditions = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_CONDITIONS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_CONDITIONS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.conditions,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export default conditionsById