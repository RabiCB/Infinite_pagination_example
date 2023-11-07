'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, {useEffect,useState} from 'react'



const Navbar = () => {

    const [isSSR, setIsSSR] = useState(true);

    useEffect(() => {
        setIsSSR(false);
    }, []);
    const router=useRouter()
    
  return (
    <>
    {!isSSR &&<div className='flex justify-between bg-gray-200 h-[50px] items-center px-8'>
    <h2 className='font-bold text-lg'>Observer</h2>
   <div className='flex items-center gap-4 '>
    <Link href="/"><h2 >Home</h2></Link>
    <Link href="/pagebased"><h2 >Pagebased_pagination</h2></Link>
    
   </div>
    
  </div>}
  </>
  )
}

export default Navbar