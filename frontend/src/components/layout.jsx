import Head from 'next/head'
import '../app/globals.css'
import React from 'react'
import Header from './header'
import Footer from './footer'

export default function Layout({children}){
  return (
    <div className="w-screen min-h-screen bg-white flex flex-col m-0">
      <Head>
        <link rel="icon" href="./images/logo.png" />
        <meta
          name="description"
          content="Use the power of AI to choose a college!"
        />
      </Head>
      <Header>
        
      </Header>
      <main className='flex-1 flex justify-center items-center bg-white py-12'>{children}</main>
      <Footer>
        
      </Footer>
    </div>
  )
}
