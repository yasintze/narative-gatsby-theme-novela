
/**
 * each time enter the application check session first just by once
 * @2019/11/13
 */
import React, { useState, useEffect } from "react"
import { silentAuth } from "@narative/gatsby-theme-novela"
import Spinner from "@narative/gatsby-theme-novela/src/components/Spinner"


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

const SessionCheck = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => silentAuth(() => setLoading(false)));

  if(loading){
    return (
      <div css={centerBox}>
        <Spinner /> 
        <p css={spn}>Loading...</p>
      </div>
    ) 
  }

  return (loading === false && <>{children}</>)
};

export const wrapRootElement = ({ element }) => (
  <SessionCheck>{element}</SessionCheck>
);
