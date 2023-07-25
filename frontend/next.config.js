/** @type {import('next').NextConfig} */
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'maps.googleapis.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'upload.wikimedia.org',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'college-gpt-beta.vercel.app',
          port: '',
        }
      ],
    },
  }
