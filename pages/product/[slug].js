// react
import React, { useState } from 'react';

// functions
import { client, urlFor } from '../../lib/client';
import { useStateContext } from '../../context/StateContext';

// dependencies
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Product from '../../components/Product/Product';



const ProductDetails = ({ product, products }) => {
  
   const { image, name, details, price } = product;

   // sets hovered or clicked image as main on display
   const [index, setIndex] = useState(0);

   // 
   const { decQty, incQty, qty, onAdd } = useStateContext();



   return (
    <div>
      <div className='product-detail-container'>

         <div>
            <div className='image-container'>
               <img src={urlFor(image && image[index])}
               className="product-detail-image" />
            </div>

            <div className='small-images-container'>
               {image.map((item, i) => (
                  <img src={urlFor(item)} className={i == index ? 
                     'small-image selected-image' : 'small-image'
                  } onMouseEnter={() => setIndex(i)} />
               ))}
            </div>
         </div>

         <div className='product-detail-desc'>
            <h1>{name}</h1>

            <div className='reviews'>
               <div>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
               </div>
               <p>(20)</p>
            </div>

            <h4>Details:</h4>
            <p>{details}</p>
            <p className='price'>${price}</p>
            <div className='quantity'>
               <h3>Quantity:</h3>
               <p className='quantity-desc'>
                  <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
                  <span className='minus' onClick="">{qty}</span>
                  <span className='minus' onClick={incQty}><AiOutlinePlus /></span>
               </p>
            </div>

            <div className='buttons'>
               <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>Add to Cart</button>
               <button type='button' className='buy-now' onClick="">Buy Now!</button>
            </div>

         </div>

      </div>

      <div className='maylike-products-wrapper'>
         <h2>You May Also Like:</h2>
         <div className='marquee'>
            <div className='maylike-products-container track'>
               {products.map(item => (
                  <Product key={item._id} product={item} />
               ))}
            </div>
         </div>
      </div>

    </div>
  )
}



// nextJS needs to know what paths can be clicked
export const getStaticPaths = async () => {

   // get all products but just the slug of each of them
   const query = `*[_type == "product"] {
     slug {
      current
     } 
   }
   `;

   const products = await client.fetch(query);

   // make it so that each slug is an obj that has a param called slug
   const paths = products.map(product => ({
      params: { 
         slug: product.slug.current
      }
   }));

   return {
      paths,
      fallback: 'blocking' // getStaticProps called before initial render 
   }
};





// used when data required to render is available at build time ahead of
// a user's request or comes from a headless CMS
export const getStaticProps = async ({ params: {slug}}) => { // <params: {slug}> gets the slug of the dinamic [slug].js

   // *=all which types are products and the first which has slug as slug.current
   const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
   
   // all products
   const productsQuery = `*[_type == "product"]`;
   
   const product = await client.fetch(productQuery);
   const products = await client.fetch(productsQuery);

   return {
     props: { product, products }
   }
 };



export default ProductDetails