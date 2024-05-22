import React, { useState } from 'react'
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FiX } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";

import Logo from '../assets/cs_white.png'
import Overlay from './Overlay';

function AdminNavbar({data,signOut}) {
    const [popup,setPopup] = useState(false)
    const [menu,setMenu] = useState(false)
    const handleSignOut = () =>{
       setPopup(true)
    }
    const handleConfirm = () => {
        signOut().then((res)=>{
            if(res === 'success'){
                window.location.reload()
                setPopup(false)
            }
        })
    }
    const handleCancel = () => {
        setPopup(false)
    }
  return (
    <div className='bg-black h-16 w-full flex text-white items-center justify-center'>
        <div className='w-[95%] max-w-[1400px] p-4 justify-between items-center flex'>
          <div className='flex items-center gap-2'>
            <img className='w-10' src={Logo} alt="" />
            <p className='text-[13px]'>Admin Panel</p>
          </div>
          {
            menu ?
            <button className='flex md:hidden lg:hidden z-10' onClick={()=>setMenu(false)}>
            <FiX size={24} color='white' />
            </button>
            :
            <button className='flex md:hidden lg:hidden z-10' onClick={()=>setMenu(true)}>
            <HiOutlineMenuAlt2 size={24} color='white' />
            </button>
          }
          {menu&&
          <div className='absolute w-[90%] justify-end flex md:hidden lg:hidden'>
                <div className='mt-36 bg-black w-40 p-4 rounded-md'>
                        <div className='flex gap-4 flex-col'>
                        <p className='p-2 border-b border-gray-500'>{data&&data.fullname}</p>
                            <button className='hover:font-bold duration-300 p-2 text-[14px] flex items-center' onClick={handleSignOut}>
                              Logout  <CiLogout  size={24}/>
                            </button>
                        </div>
                </div>
          </div>
        
            
          }
          <div className="hidden md:flex lg:flex gap-2">
            <p>{data&&data.fullname}</p>
            <button onClick={handleSignOut}>
                <CiLogout  size={24}/>
            </button>
          </div>
        </div>

        {popup&&
         <Overlay text="Are you sure you want to log out?" onConfirm={handleConfirm} onCancel={handleCancel} />
        }
    </div>
  )
}

export default AdminNavbar