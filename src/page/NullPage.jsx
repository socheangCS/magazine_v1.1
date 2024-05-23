import React from 'react'
import { Link } from 'react-router-dom'

function NullPage() {
  return (
    <div className='w-full h-screen flex flex-col gap-3 items-center justify-center'>
        <h2 className='text-[20px] font-bold md:text-2xl lg:text-3xl'>404 😢</h2>
        <h1 className='text-[20px] font-bold md:text-2xl lg:text-3xl'>Lost in the Digital Wilderness</h1>
        <p className='md:text-[18px] lg:text-[18px] text-[14px] text-gray-600 md:max-w-[800px] max-w-[70%] lg:max-w-[800px] text-wrap text-center  md:text-xl lg:text:2xl'>You've ventured into uncharted digital territory. The page you seek has eluded us. Let's guide you back to familiar paths.</p>
        <Link to="/" className='uppercase text-[12px] bg-black hover:shadow-gray-600 hover:duration-300 duration-300 text-white shadow-md px-4 rounded-md py-2 font-bold'>Back To home</Link>
    </div>
  )
}

export default NullPage
