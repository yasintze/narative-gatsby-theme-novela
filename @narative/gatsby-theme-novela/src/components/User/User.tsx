/**
 * User icon in the top navigator bar
 * to switch secret page
 * @2019/11/09
 */
import React, { useState } from "react";
import { navigate } from "gatsby";
import styled from "@emotion/styled";
import mediaqueries from "@styles/media";
import { useColorMode } from "theme-ui";
import Icons from "@icons";

const User: React.FC<{}> = () => {
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === `dark`;
  const fill = isDark ? "#fff" : "#000";
  const isBrowser = typeof window !== "undefined"
  let isSecret = isBrowser?location.pathname.includes("/secret"):false

  function userHandler(){
    if(isSecret){
      navigate("/");
    }else{
      navigate("/secret");
    }
  }

  return (
    <IconWrapper
      isDark={isDark}
      onClick={userHandler}
      data-a11y="false"
    >
      {isSecret?<Icons.Condom fill={fill}/>:<Icons.User fill={fill}/>}
    </IconWrapper>
  );
}

export default User;


const IconWrapper = styled.button<{ isDark: boolean }>`
  opacity: 0.5;
  position: relative;
  border-radius: 5px;
  width: 40px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  margin-left: 30px;

  &:hover {
    opacity: 1;
  }

  &[data-a11y="true"]:focus::after {
    content: "";
    position: absolute;
    left: 0;
    top: -30%;
    width: 100%;
    height: 160%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.tablet`
    display: inline-flex;
    transform: scale(0.708);
    margin-left: 10px;


    &:hover {
      opacity: 0.5;
    }
  `}
`;
