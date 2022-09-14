// react
import React from 'react';

// styles
import '../styles/globals.css';

// compontents
import Layout from '../sections/Layout/Layout.jsx';

function MyApp({ Component, pageProps }) {
  return (
  <Layout>
    <Component {...pageProps} />
  </Layout>)
}

export default MyApp
