import { combineReducers } from 'redux'
import conditionsById from './conditionsById'
import spots from './spots'
import tweetsByHashtag from './tweetsByHashtag'

export default combineReducers({
  ...spots,
  conditionsById,
  tweetsByHashtag
})

