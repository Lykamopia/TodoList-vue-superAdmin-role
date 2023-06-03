import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://coherent-reindeer-44.hasura.app/v1/graphql',
  headers:{
    "X-Hasura-Admin-Secret":"mMMkqdSuROhkicdhf9VPLijs0xXRa3otsyo2JgGdi6aY1e6hwYGGQYCmqyMc08aC"
  }
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

export default apolloClient;