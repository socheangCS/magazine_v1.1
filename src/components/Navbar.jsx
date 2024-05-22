import React, { useEffect, useRef, useState } from 'react'
import { Link,useLocation } from 'react-router-dom'
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import Logo from '../assets/cs_white.png'
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import { useCS } from '../contexts/CScontext';

function Navbar() {
 const location = useLocation()
 const inputRef = useRef(null);
 const {getUserPosts} = useCS()
 const [post,setPost] = useState()
 const [menu,setMenu] = useState(false)
 const [pathname, setPathname] = useState();
 const [isSearch,setIsSearch] = useState(false)
 const [searchTerm,setSearchTerm] = useState()
 useEffect(()=>{
   setPathname(location.pathname)
 },[location])
 useEffect(() => {
  if (isSearch && inputRef.current) {
    inputRef.current.focus();
  }
}, [isSearch]);

useEffect(()=>{
 getUserPosts().then((res)=>{
     setPost(res)
    })
},[getUserPosts])
  return (
    <div className='h-14 z-10 fixed bg-black w-full flex flex-row justify-center ' >
       <div className={`w-full max-w-[1430px] flex justify-between  items-center text-white p-2`}>
          <div className='flex gap-5 items-center p-2'>
            { !menu ?
             <HiOutlineMenuAlt2 onClick={()=>setMenu(true)}
              className='cursor-pointer' size={24} />
              : <FiX onClick={()=>setMenu(false)}
              className='cursor-pointer' size={24} />
              }
            <Link to="/">
              <img src={Logo} className='w-10'alt=''/>
            </Link>
          </div>
          {
             menu &&
            <div className='absolute flex flex-col w-60 items-center justify-center bg-black mt-[190px] rounded-md'>
                <div className='flex flex-col p-2 pb-10'>
                <Link  to="/" className={`text-[16px] ${pathname === 'hot'? 'text-red-600': 'text-white'} font-medium duration-300 hover:duration-300  border-b border-black hover:border-gray-300`}>Hot</Link>
                <Link to='/popular' className={`text-[16px] font-medium ${pathname === 'popular'? 'text-red-600': 'text-white'}  duration-300 hover:duration-300  border-b border-black hover:border-gray-300`}>Popular</Link>
                <Link to='/it' className={`text-[16px] font-medium ${pathname === 'it'? 'text-red-600': 'text-white'}  duration-300 hover:duration-300  border-b border-black hover:border-gray-300`}>Information Technology</Link>
                </div>
            </div>
          }
         {
          isSearch ? (
            <div className='w-[80%] flex items-center gap-2'>
                <BsSearch className='absolute ml-2' size={18}  />
              <input ref={inputRef} value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value);setMenu(false)}} className='w-[80%] outline-none border-gray-400 border bg-black rounded-md py-1 pl-10 pr-2' type="search" placeholder="Search"/>
              <FiX onClick={()=>{setIsSearch(false);setMenu(false)}}
              className='cursor-pointer' size={24} />
            </div>
          ):(
            <>
             <div className='gap-5 hidden md:flex lg:flex'>
            <Link  to="/" className={`text-[16px] ${pathname === 'hot'? 'text-red-600': 'text-white'} font-medium duration-300 hover:duration-300  border-b border-black hover:border-gray-300`}>Hot</Link>
            <Link to='/popular' className={`text-[16px] font-medium ${pathname === 'popular'? 'text-red-600': 'text-white'}  duration-300 hover:duration-300  border-b border-black hover:border-gray-300`}>Popular</Link>
            <Link to='/it' className={`text-[16px] font-medium ${pathname === 'it'? 'text-red-600': 'text-white'}  duration-300 hover:duration-300  border-b border-black hover:border-gray-300`}>Information Technology</Link>
          </div>
          <div className='flex gap-5 p-2'>
            <Link className='text-[14px] font-medium duration-300 hover:duration-300  border-b border-black hover:border-gray-300 '>Watch</Link>
            <Link className='text-[14px] font-medium duration-300 hover:duration-300  border-b border-black hover:border-gray-300'>Listen</Link>
            <Link className='text-[14px] font-medium duration-300 hover:duration-300  border-b border-black hover:border-gray-300'>Live Tv</Link>
            <BsSearch onClick={()=>{setIsSearch(true);setMenu(false)}}  size={20} className='cursor-pointer' />
          </div>
            </>
          )
         }
       </div>
       {
        searchTerm && searchTerm.length > 0 &&  isSearch &&
        <div className='absolute mt-[55px] w-full flex flex-col items-center '>
            <Card className="sm:w-[97%] lg:w-[50%] md:w-[70%]">
        <List>
        {
         post && post.filter(e=>e.title.toLowerCase().includes(searchTerm.toLowerCase())).slice(0,10).map((item,index)=>(
             <Link to={`/detail/viewpost/${item.id}`} key={index}>
              <ListItem >
                <ListItemPrefix>
                  <Avatar variant="square" alt="candice" src={item.title_img} />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray" className=' text-[14px] text-wrap'>
                    {item.title}
                  </Typography>
                  <Typography variant="small" color="gray" className=' text-[12px] text-wrap'>
                  {item.subtitle}
                  </Typography>
                </div>
              </ListItem>
             </Link>
          ))
        }
        </List>
      </Card>
        </div>
       }
    </div>
  )
}

export default Navbar