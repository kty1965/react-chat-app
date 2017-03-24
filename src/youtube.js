import React, { Component } from 'react'
import S from 'shorti'

class Youtube extends Component {
  constructor(props) {
    super(props)
    this.state = props
  }
  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div
        style={ S('br-4') }
        className="embed-responsive embed-responsive-16by9"
      >
        <iframe
          src={this.state.src}
          className="embed-responsive-item"
          allowFullScreen
        />
      </div>
    )
  }
}

export default Youtube
