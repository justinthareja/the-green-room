import { CALL_API, getJSON } from 'redux-api-middleware'
import Promise from 'bluebird'

export const REQUEST_TWEETS = 'REQUEST_TWEETS'
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const FAILED_TWEETS = 'FAILED_TWEETS'

const mapTweets = (json) => 
  json.statuses.map(status => ({
    text: status.text,
    user: status.user.screen_name,
    createdAt: status.created_at,
    id: status.id
  }))


export const fetchTweets = (hashtag) => {

  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: `/api/tweets/${hashtag}`,
      types: [
        {
          type: REQUEST_TWEETS,
          payload: { hashtag }
        },
        {
          type: RECEIVE_TWEETS,
          payload: async (action, state, res) => {
            const json = await getJSON(res)

            return {
              hashtag,
              tweets: mapTweets(json)
            }
          }
        },
        FAILED_TWEETS 
      ]
    }
  }
    
}

export const shouldFetchTweets = (state, hashtag) => {
  const tweets = state.tweetsByHashtag[hashtag]
  const shelfLife = 5 * 60 * 1000 

  if (!tweets) {
    return true
  } else if (tweets.isFetching) {
    return false
  } else {
    return new Date() - new Date(tweets.lastUpdated) > shelfLife 
  }

}


export const fetchTweetsIfNeeded = (hashtag) => {
  return (dispatch, getState) => {
    if (shouldFetchTweets(getState(), hashtag)) {
      return dispatch(fetchTweets(hashtag))
    }
    return Promise.resolve()
  }
}

export const fetchAllTweets = (dispatch, hashtags) => 
  Promise.map(hashtags, hashtag => 
    dispatch(fetchTweetsIfNeeded(hashtag)))

export const fetchAllSpotTweets = (spotId) => {
  return (dispatch, getState) => {
    const spot = getState().spots
      .filter(spot => spot.id === spotId)[0]

    return fetchAllTweets(dispatch, spot.hashtags)
  }
}