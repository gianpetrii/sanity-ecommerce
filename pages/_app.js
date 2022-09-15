// react
import React from 'react';
import { StateContext } from '../context/StateContext';


// styles
import '../styles/globals.css';

// compontents
import Layout from '../sections/Layout/Layout.jsx';
import { Toaster } from 'react-hot-toast';


function MyApp({ Component, pageProps }) {
  
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
)
}

export default MyApp
