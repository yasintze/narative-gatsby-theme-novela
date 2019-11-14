/**
 * auth0 login cheker for article.template compnent
 * @2019/11/12
 */
import React from "react";

import { login, isAuthenticated } from "../utils/auth"
import ArticleTemplate from "./article.template"


export default class ArticleAuthChecker extends React.Component {
  render() {
    const { location, pageContext } = this.props;

    if (!isAuthenticated()) {
      login()
      return <p>Redirecting to login...</p>
    }
    return <ArticleTemplate 
              location={location} 
              pageContext={pageContext} 
            />
  }
}