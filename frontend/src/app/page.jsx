import Image from 'next/image'
import Layout from '../components/layout'
import '../app/globals.css'
import Form from '@/components/form'

export default function Home() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted!");
  }
  return (
    <Layout>
      <Form></Form>
    </Layout>
  )
}
