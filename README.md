## Dependencies:
- node v5.3.0
- npm v3.3.12

## Installation
```
git clone https://github.com/justinthareja/the-green-room
cd the-green-room
npm i
npm start
```
Navigate to `localhost:1337` to view the app

# A little about the design

### Client Routes:

```
route: '/' component: <SpotOverview />
route: '/details/:id' component: <SpotDetails />
```

### State Tree:
```js
{
  sortOrder: 'descending',
  sortProp: 'name',
  selectedSpotId: 123,
  spots: [
    {
      id: 123,
      cover: 'someurl.jpg',
      name: 'sunset',
      hashtags: ['thegreenroom', 'shacked'],
      latitude: 46.1232,
      longitude: 280.123
    }
    ...
  ],
  conditionsById: {
    123: [{
      swellHeight: 34,
      swellDirection: 123,
      ...  
    }]
    234: [{ ... }]
    ...
  },
  tweetsByHashtag: {
    thegreenroom: {
      isFetching: true,
      items: []
    }
  }
}
```

This tree was built around the initial `spots.json` file given to me by Alex, and has not been normalized. For each entity requiring a network request to receive information, there is a `isFetching` flag which is toggled on during an api request and off when the response is received. 

### Fetching data
Upon initialization of the details page, only the data required to render that page is fetched. If the user navigates back to the home page, all other data is loaded, skipping over what's already cached.

To throttle the amount of network requests, a 'shelf life' is set for each entity on it's corresponding reducer. After initialization, instead of re-fetching each time the component is loaded it does so only if the age of the cached content is older than the shelf life and it is considered expired. This is primarily due to the fact that Magic Seaweed forecasts are updated about every three hours.


#### Other tidbits
Browser history is controlled with React Router, allowing seamless navigation with the brower forward and back buttons.

A Proxy was built around Twitter's Application-Only-Authentication limitation, which is not CORS compliant.

### Current Issues
- Probably not an ideal state tree without any normalization
- Could compose my reducers a bit smarter, reducing code duplication
- Browser history is not synced with store, unnoticable with the current feature set but would become a problem if this grows



