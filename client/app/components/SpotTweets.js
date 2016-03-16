import React, { PropTypes, Component } from 'react'
import '../styles/SpotTweets.scss'

class SpotTweets extends Component {

  static propTypes = {
    tweets: PropTypes.array.isRequired
  }

  timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000)

    let interval = Math.floor(seconds / 31536000)
    if (interval > 1) { return `${interval} years` }

    interval = Math.floor(seconds / 2592000)
    if (interval > 1) { return `${interval} months` }
    
    interval = Math.floor(seconds / 86400)
    if (interval > 1) { return `${interval} days` }
    
    interval = Math.floor(seconds / 3600)
    if (interval > 1) { return `${interval} hours` }
    
    interval = Math.floor(seconds / 60)
    if (interval > 1) { return `${interval} minutes` }

    return Math.floor(seconds) + " seconds"
  }

  render() {
    return (
      <div className="SpotTweets">
        <h2>Spot Chatter:</h2>
        <ul>
          {
            this.props.tweets.map(tweet =>
              (
                <li key={tweet.id}> 
                  <h3>@{tweet.user}</h3>
                  <span>  {this.timeSince(new Date(tweet.createdAt))} ago</span>
                  <p>{tweet.text}</p>
                </li>  
              )
            )
          }
        </ul>
      </div>
    )
  }

}

export default SpotTweets