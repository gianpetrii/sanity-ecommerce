// React
import React from 'react'

// sections

// components
import HeroBanner from '../components/HeroBanner/HeroBanner.jsx';
import Product from '../components/Product/Product.jsx';
import FooterBanner from '../components/FooterBanner/FooterBanner.jsx';



const index = () => {
  return (
    <>
      <HeroBanner />

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speaker of many variations</p>
      </div>

      <div className='products-container'>
        {['Product1', 'Product2'].map(
          product => product
        )}
      </div>

      <FooterBanner />
    </>
  )
}

export default index;