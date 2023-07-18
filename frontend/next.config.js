/** @type {import('next').NextConfig} */
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'maps.googleapis.com',
          port: '',
        },
      ],
    },
  }
