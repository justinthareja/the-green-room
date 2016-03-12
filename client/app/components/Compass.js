import React from 'react'
import '../styles/Compass.scss'

export default class Compass extends React.Component {

  static propTypes = {
    direction: React.PropTypes.number
  }


  state = {
    style: {
      transition: 'transform 2s ease-in-out'
    }
  }

  componentDidMount() {
    setTimeout(() =>
      this.setState({
        style: {
          transform: `rotate(${this.props.direction}deg)`
        }
      })
    , 1000)
  }

  render () {
    return (
      <div className='Compass'>
        <div className='container'>
          <div className='direction north'>N</div>
          <div className='direction south'>S</div>
          <div className='direction east'>E</div>
          <div className='direction west'>W</div>
          <div className='pointer true' style={this.state.style}></div>
          <div className='pointer untrue' style={this.state.style}></div>
          <div className='center-node'></div>
        </div>
      </div>
    )    
  }

}