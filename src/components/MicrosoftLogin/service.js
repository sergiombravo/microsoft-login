import { UserAgentApplication, AuthError } from 'msal'
import {LOGGED_IN} from "./types";

// INFO FROM https://spblog.net/post/2019/06/04/building-single-page-application-with-react-msal-js-and-pnpjs

const CLIENT_ID           = 'b9eae4a2-87d8-4172-bd2f-5e8324faec63'
const TENANT              = 'f8702755-2f21-4af5-96c6-c17321b82538\n'
const AUTHORITY           = 'https://login.microsoftonline.com/common'
const REDIRECT_URI        = 'http://localhost:3000'
const API_URL_AUTHORIZE   = 'https://login.microsoftonline.com/' + TENANT + '/oauth2/v2.0/authorize'

const MSAL_CONFIG = {
  authority: AUTHORITY,
  clientId: CLIENT_ID
}

const GRAPH_SCOPES = [
  "user.read"
]

const AUTH_PARAMS = {
  scopes: GRAPH_SCOPES
}

class Service {
  constructor() {
    this.authProvider = new UserAgentApplication({
      auth: MSAL_CONFIG
    });

    // action to perform on authentication
    this.authProvider.handleRedirectCallback(() => { // on success
      localStorage.setItem(LOGGED_IN, this.authProvider.getAccount().accountIdentifier);
    })
  }

  logOut() {
    localStorage.removeItem(LOGGED_IN);
  }

  startAsync = async () => {
    await this.authProvider.loginRedirect(AUTH_PARAMS);
  };
}

export default Service