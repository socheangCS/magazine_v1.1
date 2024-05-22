import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '../components/Skeleton'; 
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const MoreInformationNews = ({ posts }) => {
  return (
    <section className='max-w-[1400px] w-full mt-20'>
      <div className='w-full border-b p-2'>
        <h1 className='text-2xl font-bold'>More Information News</h1>
      </div>
      <div className='w-full p-2 flex flex-col lg:flex-row gap-6'>
        <section className='flex flex-col gap-2 w-full lg:w-[70%]'>
          {posts ? (
            posts
              .filter((e) => e.type === 'IT')
              .slice(0, 10)
              .map((item, index) => (
                <Link to={`/detail/viewpost/${item.id}`} key={index} className='w-full'>
                  <h1 className='text-lg hover:underline duration-300'>{item.title}</h1>
                </Link>
              ))
          ) : (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          )}
        </section>
        <section className='flex flex-col items-center gap-5 w-full lg:w-[30%]'>
          {posts ? (
            posts
              .filter((e) => e.type === 'IT')
              .slice(1, 4)
              .map((item, index) => (
                <Link
                  to={`/detail/viewpost/${item.id}`}
                  key={index}
                  className='w-full md:max-w-[300px] lg:max-w-[300px] flex flex-col text-center'
                >
                  <LazyLoadImage
                    src={item.title_img}
                    className='w-full h-48 object-cover rounded-md hover:opacity-85 duration-300'
                    alt={item.title}
                  />
                  <p className='text-sm font-bold mt-2 hover:underline duration-300'>{item.title}</p>
                </Link>
              ))
          ) : (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          )}
        </section>
      </div>
    </section>
  );
};

export default MoreInformationNews;
