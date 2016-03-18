import { CALL_API } from '../middleware/api'

export const REQUEST_CONDITIONS = 'REQUEST_CONDITIONS'
export const RECEIVE_CONDITIONS = 'RECEIVE_CONDITIONS'
export const FAILED_CONDITIONS = 'FAILED_CONDITIONS'

const mapConditions = (json) => 
  json.map(forecast => ({
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

export const fetchConditions = (spotId) => {

  return {
    reducerOptions: {
      spotId
    },
    [CALL_API]: {
      options: {
        method: 'GET',
        endpoint: `/conditions/${spotId}`
      },
      types: [REQUEST_CONDITIONS, RECEIVE_CONDITIONS, FAILED_CONDITIONS],
      onSuccess: mapConditions
    }
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
    return (new Date() - new Date(conditions.lastUpdated)) > shelfLife
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