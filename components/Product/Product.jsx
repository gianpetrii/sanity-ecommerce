// react
import React from 'react';

// dependencies
import Link from 'next/link';

// functions
import { urlFor } from '../../lib/client';




const Product = ({ product: { image, name, slug, price }}) => {
  return (
    <div>
      <Link href={"/product/" + slug.current}>
        {/* slug is the primary key of the product but if there is
        more than one of that product it will have added characters */}

        <div className="product-card">
          <img src={urlFor(image && image[0])} alt={name} 
          width={250} height={250} className="product-image"/>
          {/* checks if it has an image and only uses first one */}
          <p className='product-name'>{name}</p>
          <p className="product-price">${price}</p>

        </div>

      </Link>
    </div>
  )
}

export default Product