import React, { Component } from 'react'
import { MicrosoftLoginButton } from 'react-social-login-buttons'
import './style.css'
import MicrosoftService from './service'
import {LOGGED_IN} from "./types";

class MicrosoftLogin extends Component {

  componentWillMount() {
    this.MsService = new MicrosoftService()
    this.setState({ logged: localStorage.getItem(LOGGED_IN)})
  }

  render() {
    const { logged } = this.state

    return (
      <div className={'container'}>
        {logged &&
          <span
            style={{ display: 'block', cursor: 'pointer' }}
            onClick={() => {
              this.MsService.logOut()
              this.setState({ logged: null })
            }
          }>Log out</span>
        }
        {!logged &&
        <MicrosoftLoginButton
          style={{outline: 'none'}}
          onClick={async () => {
            await this.MsService.startAsync()
          }}
          />}
      </div>
    )
  }
}

export default MicrosoftLogin