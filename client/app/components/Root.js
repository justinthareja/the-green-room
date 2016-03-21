import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'
import configureStore from '../store/configureStore'
import SpotOverview from './SpotOverview'
import SpotDetails from './SpotDetails'
import '../styles/main.scss'

const store = configureStore()

class Root extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path='/' component={SpotOverview} />
          <Route path='/details/:spotId' component={SpotDetails} onEnter={requireAuth}/>
        </Router>
      </Provider>
    )
  }

}

const requireAuth = (nextState, replace) => {
  if (!store.getState().user.isAuthenticated) {
    replace({
      pathname: '/',
      state: {
        nextPathname: nextState.location.pathname,
        authFailed: true
      }
    })
  }
}

export default Root