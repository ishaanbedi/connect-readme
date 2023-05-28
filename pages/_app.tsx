import NavBar from '@/components/Navbar'
import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { AppProps } from 'next/app'
export default function App({
  Component,
  pageProps: { session, ...pageProps },
} : AppProps) {
  return (
    <SessionProvider session={session}>
      <NavBar />
      <Component {...pageProps} />
    </SessionProvider>
  )
}