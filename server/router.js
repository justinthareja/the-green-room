import express from 'express'
import requireAuthentication from './middleware/requireAuthentication'
import { 
  handleLogin, 
  handleSignup, 
  verifyAuthentication, 
  sendUser 
} from './controllers/auth'
import { 
  sendGoogleMapsUrl,
  sendConditions,
  sendTweets 
} from './controllers/proxy'

const router = express.Router()

router.get('/conditions/:id', sendConditions)
router.get('/tweets/:hashtag', sendTweets)
router.get('/gmaps', sendGoogleMapsUrl)

router.post('/login', handleLogin)
router.post('/signup', handleSignup)

router.get('/user', verifyAuthentication, sendUser)

export default router
