// react
import React from 'react';

// next
import Link from 'next/link';

// dependencies
import { AiOutlineShopping } from 'react-icons/ai';
import Cart from '../../components/Cart/Cart.jsx';

// functions
import { useStateContext } from '../../context/StateContext';




const Navbar = () => {

  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className='navbar-container'>

      <p className='logo'>
        <Link href="/">SANITY ECOMMERCE</Link>
      </p>

      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar