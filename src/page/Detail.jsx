import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useCS } from '../contexts/CScontext'
import { Link, useParams } from 'react-router-dom'
import Skeleton from '../components/Skeleton';
import Footer from '../components/Footer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

function Detail() {
    const {postid} = useParams()
    const [post,setPost] = useState()
    const [relative,setRelative] = useState()
    const {getUserPosts,updateView} = useCS()
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
      const form ={
        postid:postid
      }
      updateView(form)
      getUserPosts().then((res)=>{
        if(res){
          const postdata = res.filter(e=>e.id == postid)
          const relativeData = res.filter(e=>e.type == postdata[0].type)
          setRelative(relativeData)
          setPost(postdata[0])
        }
      })
      window.scrollTo({
        top: 0,
        behavior: 'smooth', 
      });
    },[postid,loading])
    const handleChangePost = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', 
      });
      setLoading(!loading)
    };
  return (
    <main className='w-full'>
      <Navbar />
      <div className=' pt-20 w-full flex  flex-col items-center p-2'>
        <div className='w-full max-w-[1400px] flex flex-col items-center'>
            {post?
              (
              <div className='flex w-[96%] ms:gap-0 ms:flex-col md:justify-between ms:items-center'>
                <div className='w-full flex lg:w-[70%] md:w-[80%] flex-col ms:items-center'>
                  <div className='w-full lg:py-10 md:py-10 sm:p-2'>
                    <h1 className='text-3xl font-bold lg:text-3xl sm:text-2xl'>{post.title}</h1>
                    <p className='text-sm pt-5 text-gray-600'>{post.subtitle} {post.created_at.substring(0, 10)}</p>
                  </div>
                  <div className='w-full' dangerouslySetInnerHTML={{ __html: post.text }} />
                </div>
                <div className='w-full lg:mt-20 md:mt-16 lg:w-[20%] gap-5 flex-col flex'>
                  <h1 className=' md:text-center md:text-2xl font-bold text-xl'>Relative Posts</h1>
                  {relative &&relative.map((item, index) => (
                    <Link className='flex flex-col items-center gap-1' to={`/detail/viewpost/${item.id}`} onClick={handleChangePost} key={index}>
                      <LazyLoadImage className='w-full md:w-40 object-cover hover:opacity-85' src={item.title_img} alt="" />
                      <h3 className='hover:underline md:w-40 text-sm duration-300'>{item.title}</h3>
                    </Link>
                  ))}
                </div>
              </div>
              )
            :
            (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            )
            }
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default Detail