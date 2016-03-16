import request from 'request'
import Promise from 'bluebird'
import { 
  MSW_API_KEY,
  TWITTER_AUTH_TOKEN,
  GOOGLE_MAPS_API_KEY
} from './config'

Promise.promisifyAll(request)

export default (app) => {

  // get most recent conditions from MSW API
  app.get('/conditions/:id', (req, res) => {

    const units = req.query.units || 'us'
    const url = `http://magicseaweed.com/api/${MSW_API_KEY}/forecast/?spot_id=${req.params.id}&units=${units}`

    return request.getAsync({
      url: url,
      json: true
    })
    .then(response => res.json(response.body))
  })

  // send all tweets matching a single hashtag
  app.get('/tweets/:hashtag', (req, res) => {

    const url = 'https://api.twitter.com/1.1/search/tweets.json?'
    
    request.getAsync({
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
  })


  // send google maps script url with api key
  app.get('/gmaps', (req, res) => {
    const url = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`
    res.send(url)
  })

}
