import React, { useEffect, useState } from 'react'
import { Post,Active,Inactive } from '../assets'
import { useCS } from '../contexts/CScontext'
import { Option, Select,Switch} from '@material-tailwind/react'
import Action from '../components/Action'

function Dashboard({adminData,setPage,sidebar,setUpdateItems}) {
  const {getPosts,toggleActive} = useCS()
  const [active,setActive] = useState()
  const [inActive,setInActive] = useState()
  const [post,setPost] = useState()
  const [items,setItems] = useState([])
  const [selectDis,setSelectDis] = useState(5)
  const [refresh,setRefresh] = useState(false)
  useEffect(()=>{
        getPosts().then((res)=>{
            setItems(res)
           if(res) setPost(res.length);
            
        })
  },[getPosts,adminData,refresh])
  useEffect(()=>{
    if(Array.isArray(items)){
      const activeCount = items.filter(e => e.active);
      const inActiveCount = items.filter(e => !e.active);
      setInActive(inActiveCount.length)
      setActive(activeCount.length);
    }
  },[items])
  const handleTogggleActiveUpdate = (item) => {
    const data = {
        'id':item.id,
        'item':!item.active 
    }
     toggleActive(data).then((res)=>{
        if(res.status === 'success'){
            setRefresh(!refresh)
        }
     })
  }
  return (
    <div key={refresh} className={`${sidebar?'w-[64%]':'w-[96%]'} p-2`}>
         <div className='p-2 w-[90%]'>
            <p>Dashboard</p>
         </div>
         <div className={`w-[96%] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2`}>
            <div className='flex flex-col shadow-md p-2 pb-8 rounded-lg  gap-2'>
              <p className=''>All Post</p>
             <div className='flex items-center pt-3  justify-between '>
             <p className='rounded-md text-[24px] '>{post&&post}</p>
             <img src={Post} alt="post" className='w-16 object-contain ' />
             </div>
            </div>
            <div className='flex flex-col shadow-md p-2 rounded-lg  gap-2'>
              <p className=''>Active</p>
             <div className='flex items-center pt-4 justify-between '>
             <p className='rounded-md text-[24px] '>{active}</p>
             <img src={Active} alt="post" className='w-16 object-contain ' />

             </div>
            </div>
            <div className='flex flex-col shadow-md p-2 rounded-lg  gap-2'>
              <p className=''>Inactive</p>
             <div className='flex items-center pt-5 justify-between '>
             <p className='rounded-md text-[24px] '>{inActive}</p>
             <img src={Inactive} alt="post" className='w-16 object-contain ' />

             </div>
            </div>
            
         </div>

         <div className={`overflow-x-auto w-[96%] mt-10`}>
            <div className='w-full p-2'>
              <div className='flex justify-between'>
                <div>
                <Select label='Show' onChange={(e)=>setSelectDis(e)} id="show">
                  {[5,10,20,50].map((item,index)=>(
                  <Option value={item.toString()} key={index}>{item}</Option>
                  ))}
                </Select>
                </div>
                <div>
                   <button onClick={()=>setPage('add')} className='bg-black rounded-md hover:bg-slate-500 text-white p-2 pl-10 pr-10'>Add </button>
                </div>
              </div>

            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            No
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Title
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Subtitle
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            TitleImage
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Text
                        </th>

                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Active
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Type
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Created_at
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                 {Array.isArray(items) && items.length > 0 ? (
                        items.slice(0,selectDis||items.length).map((item, index) => (
                            <tr key={index}>
                                <td className={`${index%2===1?'bg-gray-200':'bg-white'} text-[14px] px-4 py-2  max-w-[200px] truncate `}>{index+1}</td>
                                <td className={`${index%2===1?'bg-gray-200':'bg-white'} text-[14px] px-4 py-2  max-w-[200px] truncate `}>{item.title}</td>
                                <td className={`${index%2===1?'bg-gray-200':'bg-white'} text-[14px] px-4 py-2  max-w-[200px] truncate `}>{item.subtitle}</td>
                                <td className={`${index%2===1?'bg-gray-200':'bg-white'} text-[14px] px-4 py-2  max-w-[200px] truncate `}><img className='w-10' src={item.title_img} alt={item.title} /></td>
                                <td className={`${index%2===1?'bg-gray-200':'bg-white'} text-[14px] px-4 py-2  max-w-[200px] truncate h-[50px] `}>{item.text}</td>
                                <td className={`${index%2===1?'bg-gray-200':'bg-white'} text-[14px] px-4 py-2  max-w-[200px] truncate `}><Switch onChange={()=>handleTogggleActiveUpdate(item)} checked={item.active} /></td>
                                <td className={`${index%2===1?'bg-gray-200':'bg-white'} text-[14px] px-4 py-2  max-w-[200px] truncate `}>{item.type}</td>
                                <td className={`${index%2===1?'bg-gray-200':'bg-white'} text-[14px] px-4 py-2  max-w-[150px] truncate `}>{item.created_at}</td>
                                <td className={`${index%2===1?'bg-gray-200':'bg-white'} text-[14px] px-4 py-2  max-w-[150px] truncate `}>
                                <Action setUpdateItems={setUpdateItems} setPage={setPage} setRefresh={setRefresh} item={item} adminData={adminData} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className="px-6 py-4 text-center">
                                No data available
                            </td>
                        </tr>
                    )}
                      
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Dashboard