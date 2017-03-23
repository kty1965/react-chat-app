// app-client.js
import React, { Component } from 'react'
import { render } from 'react-dom'
import Cosmic from 'cosmicjs'
import io from 'socket.io-client'
import config from './config'
import uuid from 'node-uuid'
import S from 'shorti'
import _ from 'lodash'
import { Input } from 'react-bootstrap'

class App extends Component {

  constructor() {
    super()
    this.state = {
      data: {
        messages: []
      }
    }
  }

  componentDidMount() {
    let data = this.state.data
    setTimeout(() => {
      this.refs.author.refs.input.focus()
    }, 100)
    const socket = io()
    Cosmic.getObjects(config, (err, res) => {
      const messages = res.objects.type.messages
      if (messages) {
        messages.reverse()
        this.setState({
          data: {
            author: data.author,
            messages
          }
        })
      }
    })
    // Listen for messages coming in
    socket.on('chat message', message => {
      data = this.state.data
      const messages = this.state.data.messages
      if (data.author !== message.metafield.author.value) {
        messages.push(message)
        this.setState({
          data: {
            author: data.author,
            messages
          }
        })
      }
    })
  }

  componentDidUpdate() {
    if (this.refs.message)
      this.refs.message.refs.input.focus()
    if (this.refs.messages_scroll_area)
      this.refs.messages_scroll_area.scrollTop = this.refs.messages_scroll_area.scrollHeight
  }

  setAuthor() {
    const author = this.refs.author.refs.input.value.trim()
    if (!author)
      return
    this.refs.author.refs.input.value = ''
    const messages = this.state.data.messages
    this.setState({
      data: {
        author,
        messages
      }
    })
  }

  createMessage() {
    const data = this.state.data
    const messages = data.messages
    const socket = io()
    const message_text = this.refs.message.refs.input.value.trim()
    if (!message_text)
      return
    const message_emit = {
      message: message_text,
      author: data.author
    }
    // Send message out
    socket.emit('chat message', message_emit)
    // Render to browser
    const message_browser = {
      _id: uuid.v1(),
      metafield: {
        author: {
          value: data.author
        },
        message: {
          value: message_text
        }
      }
    }
    messages.push(message_browser)
    this.setState({
      data: {
        author: data.author,
        messages
      }
    })
    this.refs.message.refs.input.value = ''
  }

  handleSubmit(e) {
    e.preventDefault()
    const data = this.state.data
    if (data.author)
      this.createMessage()
    else
      this.setAuthor()
  }

  render() {
    const data = this.state.data
    let form_input
    if (!data.author) {
      form_input = (
        <div>
          Hi, what is your name?<br />
          <Input type="text" ref="author" />
        </div>
      )
    } else {
      form_input = (
        <div>
          Hello { data.author }, type a message:<br />
          <Input type="text" ref="message" />
        </div>
      )
    }
    const messages = data.messages
    let messages_list
    if (messages) {
      // order by created
      const sorted_messages = _.sortBy(messages, message => {
        return message.created
      })
      messages_list = sorted_messages.map(message_object => {
        if (message_object) {
          return (
            <li style={ { listStyle: 'none', ...S('mb-5') } } key={ message_object._id }>
              <b>{ message_object.metafield.author.value }</b><br/>
              { message_object.metafield.message.value }
            </li>
          )
        }
      })
    }
    const scroll_area_style = {
      ...S('h-' + (300)),
      overflowY: 'scroll'
    }
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a
                className="navbar-brand"
                href="http://cafe.naver.com/housemusicmixset"
                target="_blank"
              >
                <img alt="Brand" src={require('./images/logo.png')}
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
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-12">
              <div
                style={ S('br-4') }
                className="embed-responsive embed-responsive-16by9"
              >
                <iframe
                  src="//www.youtube.com/embed/jKrDfGoHlD4"
                  className="embed-responsive-item"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div style={ S('') }>
                <h2>React Chat App</h2>
                <div ref="messages_scroll_area" style={ scroll_area_style }>
                  <ul style={ S('p-0') }>{ messages_list }</ul>
                </div>
              </div>
              <div style={ S('b-0 w-100p') }>
                <form onSubmit={ this.handleSubmit.bind(this) }>
                  { form_input }
                </form>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="text-center">
              All right reserved.
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const app = document.getElementById('app')
render(<App />, app)
