// react and next JS
import React, { useRef } from 'react';
import Link from 'next/link';

// dependencies
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

// functionns
import { useStateContext } from '../../context/StateContext';
import { urlFor } from '../../lib/client';
import getStripe from '../../lib/getStripe.js';
import { toast } from 'react-hot-toast';



const Cart = () => {
  
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();
  
  const handleCheckout = async (cartItems) => {

    // in lib create getStripe.js for handle
    const stripe = await getStripe();
 
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });
 
    if(response.statusCode === 500) return;
    
    const data = await response.json();
 
    toast.loading('Redirecting...');
 
    stripe.redirectToCheckout({ sessionId: data.id });
  };
  


  return (
    <div className='cart-wrapper' href={cartRef}>

      <div className="cart-container">
        
        {/* cart title with button to go back */}
        <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>{totalQuantities} items</span>
        </button>

        {/* if cart is empty shows message to return to shopping */}
        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty!</h3>
            <Link href="/">
              <button 
              type='button' className='btn' onClick={() => setShowCart(false)} >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        {/* all products inside the cart */}
        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item, index) => (
            <div key={item._id} className='product'>
              
              <img src={urlFor(item?.image[0])} className="cart-product-image"/>

              <div className='item-desc'>
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    {/*  missing functions because they are defined for only 1 product */}
                    <p className='quantity-desc'>
                      <span className='minus' onClick={() => toggleCartItemQuantity(item._id, "dec")}>
                        <AiOutlineMinus />
                      </span>
                      <span className='num'>{item.quantity}</span>
                      <span className='plus' onClick={() => toggleCartItemQuantity(item._id, "inc")}>
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </div>

                  <button className='remove-item' onClick={() => onRemove(item)} type='button'>
                    <TiDeleteOutline/>
                  </button>
                </div>
              </div>
            
            </div>
          ))}
        </div>

        {/* subtotal price  */}
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <p>*To test payment repeat "424" for all the card info!*</p>
              <button type='button' className='btn' onClick={() => handleCheckout(cartItems)}>
                Pay with Stripe!  
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Cart