import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import Navbar from '../components/Navbar'
import { useCS } from '../contexts/CScontext'
import { Link } from 'react-router-dom'
import Skeleton from '../components/Skeleton';
import Footer from '../components/Footer';
import LatestHeadlines from '../components/LatestHeadlines';
import MoreInformationNews from '../components/MoreInformationNews';
import MoreSocialNews from '../components/MoreSocialNews';

const Home = () => {

 const {getUserPosts,getLastHeadLines,getItPosts,getSocialPosts} = useCS()
 const [post,setPost] = useState()
 const [lastHeadLines,setLHL] = useState([])
 const [itPosts,setItPosts] = useState([])
 const [socialPosts,setSocialPosts] = useState([])
 useEffect(() =>{
    getUserPosts().then((res)=>{
     setPost(res)
    })
 },[])
 useEffect(()=>{
    getLastHeadLines().then((res)=>{
     setLHL(res)
    })
 },[])
 useEffect(()=>{
    getItPosts().then((res)=>{
     setItPosts(res)
    })
 },[])
 useEffect(()=>{
    getSocialPosts().then((res)=>{
     setSocialPosts(res)
    })
 },[])
  return (
    <main className='w-full'>
      <Navbar />
      <div className='pt-20 w-full flex flex-col items-center p-2'>
      <div className='max-w-[1400px] p-2  w-full'>
        <h1 className='lg:text-4xl md:text-2xl text-xl font-bold'>Hot News</h1>
      </div>
        <section className='max-w-[1400px] grid md:grid-cols-4 lg:grid-cols-4 grid-cols-1 gap-2'>
            <section className='lg:col-span-2 col-span-1 md:col-span-2'>
                <div className='py-2 border-t'>
                    <p className='uppercase text-[12px] font-bold'>Latest Headlines</p>
                </div>
                <div className='w-fullflex flex-col items-center'>
                    {lastHeadLines ? lastHeadLines.map((item, index) => (
                        <Link to={`/detail/viewpost/${item.id}`} className='flex flex-col items-center' key={index}>
                            {index === 0 ?
                                <div className='flex flex-col items-center'>
                                    <LazyLoadImage className='max-w-[300px] hover:opacity-80 duration-300' src={`${item.title_img} `} alt="" />
                                    <h1 className='hover:underline lg:text-xl text-[18px] font-bold md:text-xl'>{item.title}</h1>
                                </div>
                                :
                              <div className='w-[86%]'>
                                  <h1 className='p-2 border-t border-b hover:underline  text-[15px]'>{item.title}</h1>
                              </div>
                            }
                        </Link>
                    )):(
                       <Skeleton />  
                    )}
                </div>
            </section>
            <section className='col-span-1'>
                <div className='py-2 border-t'>
                    <p className='uppercase text-[12px] font-bold'>Information Technology</p>
                </div>
                <div className='w-full flex flex-col items-center'>
                    {itPosts ? itPosts.slice(0, 5).map((item, index) => (
                        <Link to={`/detail/viewpost/${item.id}`} key={index}>
                            {index === 0 ?
                                <div className='flex flex-col items-center'>
                                    <LazyLoadImage className='hover:opacity-80 duration-300 max-w-[200px]' src={`${item.title_img}`} alt="" />
                                    <h1 className='hover:underline lg:text-lg text-[18px] font-bold md:text-lg'>{item.title}</h1>
                                </div>
                                :
                                <div className='w-full'>
                                  <h1 className='p-2 border-t border-b hover:underline  text-[15px]'>{item.title}</h1>
                              </div>
                            }
                        </Link>
                    )):(
                      <Skeleton />
                    )}
                </div>
            </section>
            <section className='col-span-1 '>
                <div className='py-2 border-t'>
                    <p className='uppercase text-[12px] font-bold'>Social</p>
                </div>
                <div>
                    {socialPosts && socialPosts.slice(0, 5).map((item, index) => (
                        <Link to={`/detail/viewpost/${item.id}`} key={index}>
                            {index === 0 ?
                                <div className='flex flex-col items-center'>
                                    <LazyLoadImage className='hover:opacity-80 duration-300' src={`${item.title_img}`} alt="" />
                                    <h1 className='hover:underline lg:text-lg text-[18px] font-bold md:text-lg'>{item.title}</h1>
                                </div>
                                :
                                <div className='w-full'>
                                <h1 className='p-2 border-t border-b hover:underline  text-[15px]'>{item.title}</h1>
                            </div>
                            }
                        </Link>
                    ))
                    }
                </div>
            </section>
        </section>

        <LatestHeadlines posts={post} />
        <MoreInformationNews posts={itPosts} />
        <MoreSocialNews posts={socialPosts} />

      </div>
      <Footer />
    </main>
  )
}

export default Home;
