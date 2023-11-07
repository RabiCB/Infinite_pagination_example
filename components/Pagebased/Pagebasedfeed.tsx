"use client"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import React, { Fragment, useEffect,useState,useCallback,useRef } from "react"


const values=[
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

export default function Pagebased() {
  const [count, setCount] = React.useState(0)

const [feeddata,setFeeddata]=useState<any>(null)
function scrollToTop() {
  window.scrollTo(0, 0);
}
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

 
  const itemsPerPage = 5;


  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end indexes for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data to display only the items for the current page
  const currentItems = values.slice(startIndex, endIndex);

  const totalPages = Math.ceil(values.length / itemsPerPage);

  const handlePageChange = (newPage:any) => {
    setCurrentPage(newPage);

    
  };




  return (
    <>
      {
        <div
          className="grid-cols-4 grid w-full max-md:grid-cols-2 max-sm:grid-cols-1 mb-10  gap-6 mt-8 px-8  "
        >
          {data?.map((d:any) => (
            <div key={d.id} style={{ border: "1px solid #ccc",borderRadius:6, textAlign: "center" }}>

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
            isLoading &&<div className="h-[100vh] flex items-center justify-center">loading..................</div>
          }

          
        </div>
      }
     

          <div>
      {/* Render the current page's items */}
      
<div className="flex gap-8 justify-center items-center mb-8">
      

      {/* Render pagination controls */}
      <div className="flex gap-8 ">
        <button className="bg-blue-300 text-white px-4 py-2 rounded-sm" disabled={Page===1} onClick={() =>{
          setPage(prev=>prev-1)
          scrollToTop()
        }} >
          Previous
        </button>
       
        
        <button className="bg-blue-300 text-white px-4 py-2 rounded-sm" onClick={() => {
          setPage(prev=>prev+1)
          scrollToTop()

        }} >
          Next
        </button>
       
      </div>
     
    </div>
    </div>
          
    </>
  )
}