import sanityClient from '@sanity/client';

const Client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECTID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN || '', // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})

export default Client;