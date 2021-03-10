import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';

const restLink = new RestLink({
    uri: 'https://newsapi.org/v2/',
    headers: {
        Authorization: '38d0eff73a114a7d882bf67c2cd874f2',
    },
});

export const client = new ApolloClient({
    link: restLink,
    cache: new InMemoryCache(),
});