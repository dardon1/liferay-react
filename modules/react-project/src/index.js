
import React from 'react';
import ReactDOM from 'react-dom';

import AppComponent from './AppComponent';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HashRouter } from 'react-router-dom';
import { setContext } from 'apollo-link-context';

const authLink = setContext((_, { headers }) => {
  return {
    headers: Object.assign({}, headers, { Authorization: `Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0` })
  }
})
const httpLink = createHttpLink({
  uri: 'http://localhost:8080/o/graphql'
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

/**
 * This is the main entry point of the portlet.
 *
 * See https://tinyurl.com/js-ext-portlet-entry-point for the most recent
 * information on the signature of this function.
 *
 * @param  {Object} params a hash with values of interest to the portlet
 * @return {void}
 */
export default function main({portletNamespace, contextPath, portletElementId, configuration}) {

    ReactDOM.render(
       <ApolloProvider client={client}>
       <HashRouter basename="/blogs">
        <AppComponent
            portletNamespace={portletNamespace}
            contextPath={contextPath}
            portletElementId={portletElementId}

            configuration={configuration}

            />
            </HashRouter>
         </ApolloProvider>,
        document.getElementById(portletElementId)
    );

}
