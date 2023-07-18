import Image from 'next/image'
import Layout from '@/components/layout';
import ProfileCard from '@/components/profileCard';
import '../globals.css'

let userData = {
  email: "string",
  country: "string",
  major: "string",
  sat_score: 1600,
  ielts_score: 9.0,
  cgpa: 5.0,
  cgpa_scale: 5.0,
}

export default function Profile() {
  return (
    <Layout isLoggedIn={true}>
      <ProfileCard userData={userData}></ProfileCard>
    </Layout>
  )
}
