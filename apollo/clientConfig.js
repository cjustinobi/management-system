import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {onError} from 'apollo-link-error'

const httpLink = new HttpLink({
    uri: 'http://localhost:8000/graphql'
})


// Error Handling
const errorLink = onError(({ graphQLErrors, networkError, response }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
        console.log(
            `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path},
             response: ${JSON.stringify(response.errors[0].debugMessage)}`
        )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export default (ctx) => ({
    // Required constructor fields.
    link: errorLink.concat(httpLink),
    cache: new InMemoryCache(),

    // Optional constructor fields.
    name: 'web app',
    defaultHttpLink: false
})
