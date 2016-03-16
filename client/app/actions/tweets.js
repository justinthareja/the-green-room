import fetch from 'isomorphic-fetch'
import Promise from 'bluebird'

export const REQUEST_TWEETS = 'REQUEST_TWEETS'
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'

export const requestTweets = (hashtag) => {
  return {
    type: REQUEST_TWEETS,
    hashtag
  }
}

export const receiveTweets = (hashtag, json) => {

  json = json.statuses.map(status => ({
    text: status.text,
    user: status.user.screen_name,
    createdAt: status.created_at,
    id: status.id
  }))

  return {
    type: RECEIVE_TWEETS,
    hashtag,
    tweets: json,
    receivedAt: Date.now()
  }
}

export const fetchTweets = (hashtag) => {

  const url = `/tweets/${hashtag}`

  return (dispatch) => {

    dispatch(requestTweets(hashtag))

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error ('Error fetching from twitter api')
        }
        return response.json()
      })
      .then(json => {
        return dispatch(receiveTweets(hashtag, json))
      })
      .catch(err => {
        throw new Error('error fetching tweets' + err.message)
      })
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