// react
import React, { createContext, useContext, useState, useEffect } from "react";

// dependencies 
import { toast } from 'react-hot-toast';




const Context = createContext();

export const StateContext = ({ children }) => {
   
   // first create all the states
   const [showCart, setShowCart] = useState(false);
   const [ cartItems, setCartItems] = useState();
   const [totalPrice, setTotalPrice] = useState();
   const [totalQuantities, setTotalQuantities] = useState();
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


   return (
      // not rendering anything, just wrapping all with context prov to pass state 
      <Context.Provider 
         value={{
            showCart, cartItems, totalPrice, totalQuantities, qty,
            incQty, decQty
      }}>
         { children }
      </Context.Provider>
   )
};
