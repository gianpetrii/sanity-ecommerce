// react
import React from 'react';

// next
import Head from 'next/head';

// components
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';




const Layout = ({ children }) => {
  return (
    <div className='layout'>
      
      <Head>
        <title>Sanitary Ecommerce Project</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main className='main-container'>
      { children }
      </main>

      <footer>
        <Footer />
      </footer>

    </div>
  )
}

export default Layout;