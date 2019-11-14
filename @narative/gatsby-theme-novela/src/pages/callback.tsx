/**
 * for auth0 service callback use, to invoke handleAuthentication
 * @2019/11/12
 */
import React from "react"
import { handleAuthentication } from "../utils/auth"
import Spinner from '../components/Spinner'

const Callback = () => {
  // call authentication process, if success then forward to `/secret` page.
  // @2019/11/13
  handleAuthentication('/secret')

  const centerBox = {
    margin: "2.5rem auto", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
  }

  const spn = {
    display: "inline-block", 
    marginLeft: "20px"
  }

  return (
    <div css={centerBox}>
      <Spinner /> 
      <p css={spn}>Loading...</p>
    </div>
  )
}

export default Callback
