import sanityClient from '@sanity/client';

const Client = sanityClient({
  projectId: 'rvtycuh1',
  dataset: 'production',
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
  token: 'skWQLNZcdIeCqJQvZ40DuoYcEyrCkcxVhqOKm8fWk0fCo4ebiy4rrLH2PIOejd27ZrrCWxfRAvPYqs2jQo4BjJIt1X1F0iUwV28YXvw94r3dSAfgbEKmwS6Qvuj0tIbllhZ9Mz679xRV5KcsyB47db03inFxz2Mthj0WyUDNcqFURBMMpHrW', // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})

export default Client;