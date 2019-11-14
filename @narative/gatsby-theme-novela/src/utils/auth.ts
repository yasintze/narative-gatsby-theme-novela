/**
 * https://auth0.com/blog/securing-gatsby-with-auth0/
 * 
 * You'll call the login function from a component in a bit, which calls Auth0's authorize function. This directs users to a login page (where they can also sign up if it's their first time visiting).
 * 
 * Once the login is complete, Auth0 will send the user back to a callback route (which you'll create next). This route will call the handleAuthentication function in this utility.
 * 
 * The handleAuthentication function calls Auth0's parseHash function, which will parse the tokens from the location hash.
 * 
 * After that, setSession will be called as a callback. There is a bit of closure happening here which allows for an empty callback. This will be important when you implement silentAuth later on. The setSession function checks for errors and adds the tokens and expiration to the tokens object. It also assigns the idTokenPayload to the user object. You'll retrieve that using getProfile from a component.
 * 
 * setSession also sets a flag in local storage called isLoggedIn, which can be checked across browser sessions.
 * 
 * Finally, the setSession function will also navigate to the account route once everything is over. Note that this isn't a very sophisticated method of redirecting since there is no implementation of remembering the browser history. For example, if this function is run from a different route, it will always redirect back to /account. In a real application, you'll want to implement something more robust.
 */


import auth0 from "auth0-js"
import { navigate } from "gatsby"

const isBrowser = typeof window !== "undefined"

const auth = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENTID,
      redirectUri: process.env.AUTH0_CALLBACK,
      responseType: "token id_token",
      scope: "openid profile email",
    })
  : {}

const tokens = {
  accessToken: false,
  idToken: false,
  expiresAt: 0,
}

let user = {}

export const isAuthenticated = () => {
  if (!isBrowser) return

  return localStorage.getItem("isLoggedIn") === "true"
}

export const login = () => {
  if (!isBrowser) return

  auth.authorize()
}

const setSession = (cb = () => {}) => (err:any, authResult:any) => {
  if (err) {
    navigate("/")
    cb()
    return
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    tokens.accessToken = authResult.accessToken
    tokens.idToken = authResult.idToken
    tokens.expiresAt = expiresAt
    user = authResult.idTokenPayload
    localStorage.setItem("isLoggedIn", "true")
    console.log('user logged: ', user)
    let forwardPath = localStorage.getItem("forwardSuccess")||"/"
    navigate(forwardPath) // redirect to secret page after login !!!
    cb()
  }
}

export const silentAuth = callback => {
  if (!isAuthenticated()) return callback()
  auth.checkSession({}, setSession(callback))
}

export const handleAuthentication = (path:string = "/") => {
  if (!isBrowser) return

  localStorage.setItem("forwardSuccess", path) // remember the path for redirect
  auth.parseHash(setSession())
}

export const getProfile = () => {
  return user
}

export const logout = () => {
  localStorage.setItem("isLoggedIn", "false")
  auth.logout()
}
