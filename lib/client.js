import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
   projectId: '9eq1iqdy',
   dataset: 'production',
   apiVersion: '2022-03-10',
   useCdn: true,
   token: process.env.NEXT_PUBLIC_SANITY_TOKEN
   // create a new API token and name it with editor permissions
   // then create .env and store it there
});

// to be able to use sanity images
const builder = imageUrlBuilder(client);

// sanity will give us access to url where images are stored
export const urlFor = (source) => builder.image(source);