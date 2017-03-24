import React, { Component } from 'react'
import S from 'shorti'

class Header extends Component {
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
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a
              className="navbar-brand"
              href="http://cafe.naver.com/housemusicmixset"
              target="_blank"
            >
              <img alt="Brand" src={require('../images/logo.png')}
                style={ S('w-32') }
              />
            </a>
            <a
              className="navbar-text"
              href="http://cafe.naver.com/housemusicmixset"
              target="_blank"
            >
              I Love House Music
            </a>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header
