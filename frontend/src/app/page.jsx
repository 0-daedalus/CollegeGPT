import Image from 'next/image'
import Layout from '../components/layout'
import UniversityCard from '../components/universityCard'
import '../app/globals.css'

export default function Home({universities}) {
  return (
    <Layout>
      <UniversityCard></UniversityCard>
    </Layout>
  )
}
