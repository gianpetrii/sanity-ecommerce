import React from 'react'

const index = () => {
  return (
    <>
      HeadBanner

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speaker of many variations</p>
      </div>

      <div className='products-container'>
        {['Product1', 'Product2'].map(
          product => product
        )}
      </div>

      Footer
    </>
  )
}

export default index;