import { REQUEST_TWEETS, RECEIVE_TWEETS } from '../actions/tweets'

const tweetsByHashtag = (state = {}, action) => {
  switch(action.type) {
    case REQUEST_TWEETS:
    case RECEIVE_TWEETS:
      let nextState = {}
      nextState[action.hashtag] = tweets(state[action.hashtag] , action)
      return {
        ...state,
        ...nextState
      }
    default: 
      return state
  }
}

const tweets = (state = {
  isFetching: false,
  items: {}
}, action) => {
  switch(action.type) {
    case REQUEST_TWEETS:
      return {
        ...state,
        ...{ 
          isFetching: true 
        }
      } 
    case RECEIVE_TWEETS:
      return {
        ...state, 
        ...{
          isFetching: false,
          items: action.tweets,
          lastUpdated: Date.now()
        }
      }
    default:
      return state
  }
}

export default tweetsByHashtag