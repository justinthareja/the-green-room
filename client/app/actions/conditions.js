import fetch from 'isomorphic-fetch'

export const REQUEST_CONDITIONS = 'REQUEST_CONDITIONS'
export const RECEIVE_CONDITIONS = 'RECEIVE_CONDITIONS'

export const requestConditions = (spotId) => {
  return {
    type: REQUEST_CONDITIONS,
    spotId,
  }
}

export const receiveConditions = (spotId, json) => {
  json = json.map(forecast => ({
    swellHeight: forecast.swell.components.combined.height,
    swellPeriod: forecast.swell.components.combined.period,
    swellDirection: forecast.swell.components.combined.direction,
    swellCompassDirection: forecast.swell.components.combined.compassDirection,
    swellUnit: forecast.swell.unit,
    windDirection: forecast.wind.direction,
    windCompassDirection: forecast.wind.compassDirection,
    windSpeed: forecast.wind.speed,
    windUnit: forecast.wind.unit,
    timestamp: forecast.timestamp,
    fadedRating: forecast.fadedRating,
    solidRating: forecast.solidRating
  }))

  return {
    type: RECEIVE_CONDITIONS,
    spotId,
    conditions: json,
    receivedAt: Date.now()
  }
}

export const fetchConditions = (spotId) => {

  const url = `/conditions/${spotId}`
  
  return (dispatch) => {

    dispatch(requestConditions(spotId))

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('bad response from the msw server')
        }
        return response.json()
      })
      .then(json => {
        dispatch(receiveConditions(spotId, json))
      })
      .catch(err => {
        throw new Error('error fetching msw data', err.message)
      })
  }
}

export const shouldFetchConditions = (state, spotId) => {
  const conditions = state.conditionsById[spotId]
  const shelfLife = 60 * 60 * 1000

  if (!conditions) {
    return true
  } else if (conditions.isFetching) {
    return false
  } else {
    new Date() - new Date(conditions.lastUpdated) > shelfLife
  }

}

export function fetchConditionsIfNeeded(spotId) {
  return (dispatch, getState) => {
    if (shouldFetchConditions(getState(), spotId)) {
      return dispatch(fetchConditions(spotId))
    } 
    return Promise.resolve()
  }
}