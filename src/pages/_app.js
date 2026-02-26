// import '../styles/globals.css'
// import { ApolloProvider } from '@apollo/client'
// import client from '../lib/apolloClient'
// import { Toaster } from 'react-hot-toast'


// export default function App({ Component, pageProps }) {
//   return (
//     <ApolloProvider client={client}>
//       <Component {...pageProps} />
//     </ApolloProvider>
//   )
// }

import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client/react'
import client from '../lib/apolloClient'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}