import React, { Component } from 'react'
import S from 'shorti'

class Footer extends Component {
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
      <div style={ S('bg-eee w-100p p-20 mt-50') }>
        <div className="container" style={ S('font-16') }>
          <div className="pull-left">
            <a href="http://cafe.naver.com/housemusicmixset" className="text-muted">
              <img alt="Brand" src={require('../images/naver-cafe.png')}
                style={ S('w-14 h-14 mr-5 mb-3') }
              />
              I Love House Music (feat. Huy)
            </a>
          </div>
          <div className="pull-right text-muted">
            <ul className="list-inline">
              <li>
                <a href="https://www.instagram.com/ilhm.official/" className="text-muted">
                  <span className="socicon socicon-instagram" />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/ilhmkorea/" className="text-muted">
                  <span className="socicon socicon-facebook" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
