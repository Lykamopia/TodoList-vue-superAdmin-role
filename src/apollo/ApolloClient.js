import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

const httpLink = createHttpLink({
 
  uri: 'https://coherent-reindeer-44.hasura.app/v1/graphql',
  headers:{
    "X-Hasura-Admin-Secret":"mMMkqdSuROhkicdhf9VPLijs0xXRa3otsyo2JgGdi6aY1e6hwYGGQYCmqyMc08aC"
  }
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

export default apolloClient;