import React from 'react'
import Logo from "../assets/cs_white.png"
import { Link } from 'react-router-dom'
import { FaTelegram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const data = [
  {
    text: 'Term of Use',
    link: ''
  },
  {
    text: 'Privacy Policy',
    link: ''
  },
  {
    text: 'Ad Choices',
    link: ''
  },
  {
    text: 'Accessibility',
    link: ''
  },
  {
    text: 'About',
    link: ''
  },
  {
    text: 'Newsletters',
    link: ''
  },
  {
    text: 'Transcripts',
    link: ''
  },
  {
    text: 'Cookie Settings',
    link: ''
  },
]
function Footer() {
  return (
    <footer className='bg-black px-2 py-7 mt-10 text-white w-full flex flex-col items-center'>
        <div className='flex w-full sm:flex-col items-center justify-between max-w-[1400px] border-gray-700 border-b border-t'>
           <div className='py-6 px-2 flex items-center gap-2'>
           <Link to="/" >
            <img src={Logo} className='w-16' alt="" />
          </Link>
          <a target='_blank' className='bg-white text-black p-2 text-sm font-bold duration-300 hover:bg-gray-400 hover:duration-300 rounded-md' href="https://socheang.vercel.app/about">My Portfolio</a>
           </div>
   
          <div className='flex items-center gap-4 p-2'>
            <h1 className='font-bold uppercase md:text-lg lg:text-lg text-[13px]'>Follow Socheang :</h1>
             <div className='flex gap-2'>
                <a target='_blank' href="https://t.me/socheangdev"><FaTelegram className='text-[22px] lg:text=[30px] md:text-[30px]'/></a>
                <a target='_blank' href="https://www.facebook.com/socheangdev"><FaFacebookSquare className='text-[22px] lg:text=[30px] md:text-[30px]'/></a>
                <a target='_blank' href="https://twitter.com/socheangCS"><FaXTwitter className='text-[22px] lg:text=[30px] md:text-[30px]'/></a>
             </div>
          </div>
        </div>
        <div className='py-4 w-full items-center flex flex-col'>
            <div className='grid md:grid-cols-8 lg:grid-cols-8 grid-cols-4 items-center'  >
             {
              data.map((item,index)=>(
                <Link key={index} className=''>
                  <p className='text-center text-[13px]'>{item.text}</p>
                </Link>
              ))
             }
            </div>
            <div className='mt-12'>
              <h6 className='text-center text-[13px]'>© 2024 SocheangDev. Using React JS, Express JS, Supabase. All Rights Reserved.</h6>
              <h6 className='text-center mt-2 text-[13px]'>SocheangDev ™ & © 2024 a web developer.</h6>
           </div>
        </div>
    </footer>
  )
}

export default Footer