// COMO CARD, DATE Y CODIGO USO TODO 424 REITERADAS VECES
import Stripe from 'stripe';

// go to stripe.com --> test mode --> save publish key in .env
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // aditioal props that work est with simple purchases
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
         // to create it go into stripe --> products --> shippig rates --> create it --> get id and paste it below
         { shipping_rate: 'shr_1Lj9MTGTty2bKdeb99oZR5ho' },
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref; // this is only a ref, not real image
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/9eq1iqdy/production/').replace('-webp', '.webp');
          // do the same for different file formats like -jpg to .jpg
          
          /*Example: [
           {
             // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
             price: '{{PRICE_ID}}',
             quantity: 1,
           },
         ]*/

          return {
            price_data: { 
              currency: 'usd',
              product_data: { 
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled:true,
              minimum: 1,
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}