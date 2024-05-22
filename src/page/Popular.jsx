
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCS } from '../contexts/CScontext'
import Skeleton from '../components/Skeleton'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
function Popular() {
    const {getPopularPosts} = useCS()
    const [posts,setPosts]= useState()
    useEffect(()=>{
        getPopularPosts().then((res)=>{
            if(res){
              const sortedPosts = res.sort((a, b) => b.view - a.view);
              setPosts(sortedPosts);
            }
        })
    },[])
  return (
    <>
        <Navbar />
       <div className='pt-20'>
       <div className='w-full flex flex-col items-center'>
       <div className='w-full min-h-[600px]  max-w-[1400px]'>
        <h1 className='text-xl md:text-2xl lg:text-3xl p-2 font-bold'>Popular Posts</h1>
            {posts?(
            <div className='grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {posts.map((item) => (
              <Link  to={`/detail/viewpost/${item.id}`} key={item.id} className='post-item p-4 bg-white rounded shadow-md'>
                <LazyLoadImage  src={item.title_img} alt={item.title} className='w-full hover:opacity-85 duration-300 h-48 object-cover rounded-md' />
                <h2 className='mt-4 hover:underline text-lg font-semibold'>{item.title}</h2>
                <p className='mt-2 text-sm text-gray-600'>Views: {item.view}</p>
              </Link>
            ))}
          </div>
            ):(
               <>
                 <Skeleton />
                 <Skeleton />
                 <Skeleton />
                 <Skeleton />
               </>
            )}
        </div>
       </div>
       </div>
        <Footer />
    </>
  )
}

export default Popular