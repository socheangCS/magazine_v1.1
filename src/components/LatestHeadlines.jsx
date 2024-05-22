import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '../components/Skeleton'; 
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
const LatestHeadlines = ({ posts }) => {
  return (
    <section className='max-w-[1400px] w-full mt-20 px-4'>
      <h1 className='uppercase border-b-2 border-gray-300 text-lg font-bold mb-6'>
        More Latest Headlines
      </h1>
      <div className='flex flex-wrap sm:flex-col w-full gap-6'>
        {posts ? (
          posts.slice(1, 9).map((item, index) => (
            <Link
              to={`/detail/viewpost/${item.id}`}
              key={index}
              className='sm:w-full md:w-[48%] lg:w-[23%] p-2 flex flex-col bg-white rounded shadow-md hover:shadow-lg transition-shadow duration-300'
            >
              <LazyLoadImage
                className='h-48 w-full object-cover rounded-t-md'
                src={item.title_img}
                alt={item.title}
              />
              <div className='p-4'>
                <p className='hover:underline text-sm sm:text-base text-gray-800 font-medium'>
                  {item.title}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )}
      </div>
    </section>
  );
};

export default LatestHeadlines;
