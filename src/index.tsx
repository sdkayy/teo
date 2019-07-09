import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import Routes from './routes';
import { WebSocketLink } from 'apollo-link-ws';
import Cookies from 'js-cookie';
import * as serviceWorker from './serviceWorker';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';

const store = createStore(reducers);

// Apollo Client Setup
const cache = new InMemoryCache();
const baseUrl = 'url.com/graphql';
const API_URL = `https://${baseUrl}`;
const WS_URL = `wss://${baseUrl}`;

const httpLink = new HttpLink({
  credentials: 'include',
  headers: {
    user: Cookies.get('user'),
  },
  uri: API_URL,
});

const wsLink = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true,
  },
});

const terminatingLink = split(
  ({ query }) => {
    // @ts-ignore
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const link = ApolloLink.from([terminatingLink]);

const client = new ApolloClient({
  link,
  cache,
});

const App = (props: any) => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
