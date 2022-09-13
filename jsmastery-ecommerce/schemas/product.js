export default {
   name: 'product',
   title: 'Product',
   type: 'document',
   fields: [
      {
         name: 'image',
         title: 'Image',
         type: 'array',
         of: [{ type: 'image' }],
         option: {
            hotspot: true, /* 1 */
         }
      }, 
      {
         name: 'name', 
         title: 'Name',
         type: 'string'
      },
      {
         name: 'slug', /* a unique string or url tag */
         title: 'Slug',
         type: 'slug',
         options: [
            {
               source: "name", /* unique slug based on name property */
               maxLenght: 90,
            }
         ]
      },
      {
         name: 'price',
         title: 'Price',
         type: 'number'
      },
      {
         name: 'details',
         title: 'Details',
         type: 'string'
      }
   ]
}

/* 

1:
Enables the user interface for selecting what areas of an image should 
always be cropped, what areas should never be cropped, and the center of 
the area to crop around when resizing. The hotspot data is stored in the 
image field itself, not in the image asset, so images can have different 
crops for each place they are used.

Hotspot makes it possible to responsively adapt images to different aspect 
ratios at display time. The default value for hotspot is false.
*/