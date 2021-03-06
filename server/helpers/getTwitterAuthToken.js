import request from 'request'
import { promisifyAll } from 'bluebird'
import config from '../config'

promisifyAll(request)

export default () => {

  const cat = `${config.TWITTER_API_KEY}:${config.TWITTER_API_SECRET}`
  const credentials = new Buffer(cat).toString('base64')
  const url = 'https://api.twitter.com/oauth2/token'

  return request.postAsync({
    url: url,
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: 'grant_type=client_credentials'
  })
  .then(response => response.body)
  .tap(console.log)
  
}