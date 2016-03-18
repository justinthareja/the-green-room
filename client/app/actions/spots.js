import getCurrent from '../helpers/getCurrentConditions'

export const UPDATE_ACTIVITY_METRIC = 'UPDATE_ACTIVITY_METRIC'

export const updateActivityMetric = (id, rating) => {
  return {
    type: UPDATE_ACTIVITY_METRIC,
    rating,
    id 
  }
}

export const calculateActivityRating = (spot) => {
  return (dispatch, getState) => {
    const { conditionsById, tweetsByHashtag } = getState()

    const heightMultiplier = 1.6
    const expiration = 24 * 60 * 60 * 1000

    const conditions = conditionsById[spot.id].items
    const swellRating = getCurrent(conditions).swellHeight * heightMultiplier
    
    let tweets = spot.hashtags
      .map(hashtag => tweetsByHashtag[hashtag].items)
      .reduce((result, tweets) => [ ...result, ...tweets])

    const recentTweets = tweets.filter(tweet => {
      const age = new Date() - new Date(tweet.createdAt)
      return age < expiration
    })

    const metric = Math.round(recentTweets.length + swellRating)

    dispatch(updateActivityMetric(spot.id, metric))
  } 
}

export const SELECT_SPOT = 'SELECT_SPOT'

export const selectSpot = (spotId) => {
  return {
    type: SELECT_SPOT,
    spotId
  }
}

export const SET_SORT_PROP = 'SET_SORT_PROP'

export const setSortProp = (prop) => {
  return {
    type: SET_SORT_PROP,
    prop
  }
}

export const SET_SORT_ORDER = 'SET_SORT_ORDER'

export const setSortOrder = (order) => {
  return {
    type: SET_SORT_ORDER,
    order
  }
}

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const setVisibilityFilter = (filter) => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}

