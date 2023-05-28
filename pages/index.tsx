
import LandingPageSignedIn from "@/components/LandingPageSignedIn"
import LandingPageSignedOut from "@/components/LandingPageSignedOut"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { AiOutlineLoading } from 'react-icons/ai'
const Home = () => {
  const { data: session, status } = useSession()

  return (
    <>
      <Head>
        <title>Special Dayz</title>
        <meta name="description" content="Special Dayz is a platform to celebrate your special days with your loved ones." />
      </Head>
      {status === "loading" && (
        <div className="flex items-center justify-center h-screen">
          <AiOutlineLoading className="animate-spin" />
        </div>
      )}
      {status === "unauthenticated" && <LandingPageSignedOut />}
      {status === "authenticated" && <LandingPageSignedIn />}
    </>
  )
}

export default Home;