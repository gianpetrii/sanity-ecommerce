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

   }


   return (
      // not rendering anything, just wrapping all with context prov to pass state 
      <Context.Provider 
         value={{
            showCart, cartItems, totalPrice, totalQuantities, qty, setShowCart,
            incQty, decQty, onAdd
      }}>
         { children }
      </Context.Provider>
   )
};



// allows us to use state like a hook
export const useStateContext = () => useContext(Context);