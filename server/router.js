import request from 'request'
import Promise from 'bluebird'
import config from './config'

Promise.promisifyAll(request)

export default (app) => {

  // get most recent conditions from MSW API
  app.get('/conditions/:id', (req, res) => {

    const units = req.query.units || 'us'
    const url = `http://magicseaweed.com/api/${config.MSW_API_KEY}/forecast/?spot_id=${req.params.id}&units=${units}`

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
        'Authorization': `Bearer ${config.TWITTER_AUTH_TOKEN}`
      }
    })
    .then(response => res.json(response.body))
  })

}
