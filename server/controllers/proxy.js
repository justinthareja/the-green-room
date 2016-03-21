import { promisifyAll } from 'bluebird'
import request from 'request'
import { 
  MSW_API_KEY,
  TWITTER_AUTH_TOKEN,
  GOOGLE_MAPS_API_KEY
} from '../config'

promisifyAll(request)

export const sendGoogleMapsUrl = (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`
  res.json({ url })
}

export const sendConditions = (req, res, next) => {

  const units = req.query.units || 'us'
  const url = `http://magicseaweed.com/api/${MSW_API_KEY}/forecast/?spot_id=${req.params.id}&units=${units}`

  return request.getAsync({
    url: url,
    json: true
  })
  .then(response => res.json(response.body))
  .catch(next)
}

export const sendTweets = (req, res, next) => {

  const url = 'https://api.twitter.com/1.1/search/tweets.json?'
  
  return request.getAsync({
    url: url,
    qs: {
      q: `#${req.params.hashtag}`
    },
    json: true,
    headers: {
      'Authorization': `Bearer ${TWITTER_AUTH_TOKEN}`
    }
  })
  .then(response => res.json(response.body))
  .catch(next)
}