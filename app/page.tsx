
import Robots from '@/components/Feed.tsx/Feed'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import { Suspense } from "react"
export default function Home() {
 



  return (
    <>
     <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Robots />
      </Suspense>
    </>
  )
}
