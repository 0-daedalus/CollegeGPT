/** @type {import('next').NextConfig} */
module.exports = {
    images: {
      domains: ['lh3.googleusercontent.com', 'maps.googleapis.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
          port: '',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'maps.googleapis.com',
          port: '',
          pathname: '**',
        }
      ],
    },
  }
