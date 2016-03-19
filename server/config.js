// hide all sensitive information in environmental variables
// when developing locally, make sure to export from .zshrc 
export const TWITTER_API_KEY = process.env.GREEN_ROOM_TWITTER_API_KEY 
export const TWITTER_API_SECRET = process.env.GREEN_ROOM_TWITTER_API_SECRET 
export const TWITTER_AUTH_TOKEN = process.env.GREEN_ROOM_TWITTER_BEARER_TOKEN
export const GOOGLE_MAPS_API_KEY = process.env.GREEN_ROOM_GOOGLE_MAPS_API_KEY 
export const MSW_API_KEY = process.env.GREEN_ROOM_MSW_API_KEY 
export const MSW_API_SECRET = process.env.GREEN_ROOM_MSW_API_KEY 

// mongo database url
export const DB_URI = process.env.GREEN_ROOM_DB_URI || 'mongodb://localhost/green-room-dev'

// a random string used for the jwt encoding
export const JWT_SECRET = 'so pitted brah'

