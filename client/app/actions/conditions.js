import { CALL_API, getJSON } from 'redux-api-middleware'

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
    [CALL_API]: {
      method: 'GET',
      endpoint: `/api/conditions/${spotId}`,
      types: [
        {
          type: REQUEST_CONDITIONS,
          payload: { spotId }
        },
        {
          type: RECEIVE_CONDITIONS,
          payload: async (action, state, res) => {
            const json = await getJSON(res)
            return {
              conditions: mapConditions(json),
              spotId
            }
          }
        },
        FAILED_CONDITIONS
      ],
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