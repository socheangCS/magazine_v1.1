import React, { useEffect, useState } from 'react'
import { useCS } from '../contexts/CScontext'
import {  useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import Dashboard from './Dashboard';
import { RiArrowRightWideLine } from "react-icons/ri";
import { TiMediaPlayReverse } from "react-icons/ti";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import AddNews from '../components/AddNews';
import Edit from '../components/Edit';

function Admin() {
    const {getData,signOut,addPost,updatePost} = useCS()
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [page,setPage ] = useState('dashboard')
    const [isHovered, setIsHovered] = useState(false);
    const [updateItems,setUpdateItems] = useState()
    const [sidebar,setSidebar] = useState(window.resizeTo>700?true:false)
    useEffect(()=>{
         getData().then((res)=>{
            if(res.aid === undefined&&res.fullname === undefined){
                navigate('/admin-login')
            }else{
                setData(res)
            }
         })
    },[navigate,getData])
  return (
     <main className='w-full flex flex-col items-center' >
        <AdminNavbar data={data} signOut={signOut} />
        <section className='flex w-full max-w-[1400px]'>
              <div className={`${sidebar && 'w-[400px]' } hidden lg:flex md:flex min-h-[93vh]`}>
              {sidebar&&
             <div className='hidden w-[250px] bg-gray-50 h-full  lg:flex md:flex flex-col items-center'>
             <button className={`${page === 'dashboard' ? 'bg-gray-200' : ''} hover:bg-gray-200 p-1  rounded-md w-[90%] flex items-center gap-1 mt-5`} onClick={()=>setPage('dashboard')}><MdOutlineSpaceDashboard size={20} /> Dashboard</button>
            </div>}
             <div className='h-full md:flex lg:flex hidden flex-col items-center justify-center'>
                <button className='flex items-center' onClick={()=>setSidebar(!sidebar)}>
                    <div className=''>
                     <RiArrowRightWideLine
                       onMouseEnter={() => setIsHovered(true)} 
                       onMouseLeave={() => setIsHovered(false)}
                       size={27} 
                       className='text-gray-400 hover:text-black duration-300'  />
                    </div>
                      <span className={`${isHovered ? 'block' : 'hidden'} absolute ml-7  bg-black p-2 rounded-lg duration-300 text-[12px] text-white font-bold `}> 
                      <TiMediaPlayReverse size={20} color='black' className='absolute ml-[-19px]'/>{sidebar?'Close sidebar':'Open sidebar'}</span>
                </button>
            </div>
              </div>
          
              {page === 'dashboard'&& <Dashboard setUpdateItems={setUpdateItems} sidebar={sidebar} setPage={setPage} adminData={data} />}
              {page === 'add'&& <AddNews setPage={setPage} adminData={data} addPost={addPost} />}
              {page === 'update'&& <Edit setPage={setPage} adminData={data} updatePost={updatePost} item={updateItems} />}
        </section>
     </main>
  )
}

export default Admin