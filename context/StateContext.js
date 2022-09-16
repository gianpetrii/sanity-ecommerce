// react
import React, { createContext, useContext, useState, useEffect } from "react";

// dependencies 
import { toast, ToastBar } from 'react-hot-toast';




const Context = createContext();

export const StateContext = ({ children }) => {
   
   // first create all the states
   const [showCart, setShowCart] = useState(false);
   const [ cartItems, setCartItems] = useState([]);
   const [totalPrice, setTotalPrice] = useState(0);
   const [totalQuantities, setTotalQuantities] = useState(0);
   const [ qty, setQty] = useState(1);

   let foundProduct, index; // product and index to update in cart




   // modify quantity of a product
   const incQty = () => {
      setQty(prevQty => prevQty + 1);
   };

   const decQty = () => {
      setQty(prevQty => {
         if (prevQty < 2) return 1; // because cannot go lower than one    
         
         return prevQty - 1;
      });
   };




   // adds product to cart or adds 1 to quantity of product
   const onAdd = (product, quantity) => {

      // checks if product is already in cart
      const checkProductInCart = cartItems.find(item => {
         item._id == product._id
      })

      setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity);
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity);

      // if it is then update quantity
      if (checkProductInCart) {
         const updatedCartItems = cartItems.map(cartProduct => {
            if(cartProduct._id == product._id) {
               return {
                  ...cartProduct,
                  quantity: cartProduct.quantity + quantity
               }
            }
         })
         setCartItems(updatedCartItems);
         toast.success(`${qty} was added to the cart`);

      } else { // if product is not already in cart
         
         product.quantity = quantity;

         setCartItems([...cartItems, {...product }])
         toast.success(`${product.name} was added to the cart`);
      }
   };




   // change item quantity in cart
   const toggleCartItemQuantity = (id, value) => {
      foundProduct = cartItems.find((item) => item._id === id)
      index = cartItems.findIndex((product) => product._id === id);
      const newCartItems = cartItems.filter((item) => item._id !== id)
  
      if(value === 'inc') {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
      } else if(value === 'dec') {
         if (foundProduct.quantity > 1) {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
         }
      }
   };



   // 
   const onRemove = (product) => {
      foundProduct = cartItems.find((item) => item._id === product._id);
      const newCartItems = cartItems.filter((item) => item._id !== product._id);
  
      setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
      setCartItems(newCartItems);
   };




   return (
      // not rendering anything, just wrapping all with context prov to pass state 
      <Context.Provider 
         value={{
            showCart, cartItems, totalPrice, totalQuantities, qty, setShowCart,
            incQty, decQty, onAdd, toggleCartItemQuantity, onRemove
      }}>
         { children }
      </Context.Provider>
   )
};



// allows us to use state like a hook
export const useStateContext = () => useContext(Context);