"use client"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import React, { Fragment, useEffect,useState,useCallback,useRef } from "react"


export default function Robots() {
  const [count, setCount] = React.useState(0)

const [feeddata,setFeeddata]=useState<any>(null)

const [Page,setPage]=useState(1)
const observer = useRef<IntersectionObserver>()
const loader=useRef<any>(null)
  async function getUsers() {
    const data=await fetch(`https://api.punkapi.com/v2/beers?page=${Page}&per_page=20`)
  
    return data.json()

    

   
  }
  const { data ,isLoading} = useQuery<any[]>({
    queryKey: ["stream-hydrate-users",Page],
    queryFn: () => getUsers(),
    
    staleTime: 5 * 1000,
  })
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prev) => prev + 1)
    }, 100)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (data) {
        if (entries[0].isIntersecting && entries) {
          setPage((prev) => prev + 1)
          
        }
      }
    })

    if (loader.current) {
      observer.current.observe(loader.current)
    }

    

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  })



  


  useEffect(()=>{

    setFeeddata((prev:Array<object>)=>[...prev ??[],...data ??[]])

  },[Page,data])



  return (
    <Fragment>
      {
        <div
          className="grid-cols-4 grid w-full max-md:grid-cols-2 max-sm:grid-cols-1  gap-6 mt-8 px-8 "
        >
          {feeddata?.map((d:any) => (
            <div key={d.id} className="p-2" style={{ border: "1px solid #ccc ",borderRadius:6, textAlign: "center" }}>
              <div className="w-full h-[240px] relative">
              <Image
               loading="lazy"
                src={d?.image_url}
                alt={d.name}
                fill
                className="absolute  object-cover"
              />
              </div>
              
              <h3>{d?.name}</h3>
            </div>
          ))}
          <div ref={loader} className="mt-4">

          </div>
          {
            isLoading &&<div>loading..................</div>
          }
        </div>
      }
    </Fragment>
  )
}