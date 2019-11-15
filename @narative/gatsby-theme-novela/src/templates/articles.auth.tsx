/**
 * auth0 login cheker for articles.template compnent
 * @2019/11/12
 */
import React from "react";

import { login, isAuthenticated } from "../utils/auth"
import ArticlelsTemplate from "./articles.template"


export default class ArticlesAuthChecker extends React.Component {
  render() {
    const {location, pageContext} = this.props;

    if (!isAuthenticated()) {
      login()
      return <p>Redirecting to login...</p>
    }
    return <ArticlelsTemplate 
              location={location} 
              pageContext={pageContext} 
            />
  }
}
