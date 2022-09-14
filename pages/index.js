// React
import React from 'react'

// sections

// components
import HeroBanner from '../components/HeroBanner/HeroBanner.jsx';
import Product from '../components/Product/Product.jsx';
import FooterBanner from '../components/FooterBanner/FooterBanner.jsx';

//sanity
import { client } from '../lib/client.js';



const Home = ({products, banners}) => {

  const array = ["2", "1"];
  return (
    <>

      <HeroBanner heroBanner={ banners.length && banners[0]} />
      {/* quite interestingly I can directly pass object or array with 
      object inside when I first ask about lenght and on the HeroBanner 
      component I get the prop {heroBanner}. Else I have to use 
      {...banners[0]} which in turn opens it and inside HeroBanner component
      props I must directly call {smallText, and such}
      */}

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speaker of many variations</p>
      </div>

      <div className='products-container'>
        {products?.map(
          product => product.name
        )}
      </div>

      <FooterBanner />
    </>
  )
};




// whenever fetching data from API or server
export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]' // *=all which types are products
  const products = await client.fetch(productsQuery);

  const bannerQuery = '*[_type == "banner"]' // *=all which types are products
  const banners = await client.fetch(bannerQuery);

  return {
    props: { products, banners }
  }
};




export default Home;