// react
import React from 'react'

// dependencies
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';


const Footer = () => {
  return (
    <div className='footer-container'>

      <p>2022 SANITY ECOMMERCE. All rights reserved</p>
      <p className='icons'>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
      
    </div>
  )
}

export default Footer