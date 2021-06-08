import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter } from 'react-router-dom'

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




ReactDOM.render(
  <ApolloProvider client={client}>
  <BrowserRouter>
  <App />
</BrowserRouter>
 </ApolloProvider>,
  document.getElementById('root')
);
