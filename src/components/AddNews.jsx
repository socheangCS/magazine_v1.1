import React, { useState } from 'react';
import Reactdraft from './Reactdraft';
import {Switch,Select,Option} from "@material-tailwind/react"
import SuccessOverlay from './SuccessOverlay';
import { useNavigate } from 'react-router-dom';
function AddNews({adminData,addPost,setPage}) {
  const navi = useNavigate()
  const [draft,setDraft] = useState()
  const [title,setTitle] = useState()
  const [titleImg,setTitleImg] = useState()
  const [subTitle,setSubTitle] = useState()
  const [active,setActive] = useState(true)
  const [type,setType] = useState()
  const [success,setSuccess] = useState()
  const handleSubmit = () => {
      const data = {
        apikey:adminData.aid,
        title:title,
        sub_title:subTitle,
        title_img:titleImg,
        text: draft,
        active:active,
        type:type
      }
      addPost(data).then((res)=>{
          if(res.status === 'success'){
            setSuccess(true)
          }
      })
  }
  const handleTypeChange = (e) => {
    setType(e);
  };
const handleClose = () =>{
  setSuccess(false)
  navi('/cs-admin')
}
  return (
    <div className="flex p-2 flex-col w-full items-center">
      <div className=" w-full max-w-[700px] border p-10 flex flex-col gap-6 rounded-lg">
          <h1 className='text-2xl font-bold '>Add </h1>
          <div className='flex flex-col'>
            <label htmlFor="title" className='uppercase text-[13px]  font-bold text-gray-500'>Title</label>
            <input
             type="text"
             className='text-[15px] outline-none border pl-4 rounded-lg p-2 placeholder:text-[14px]  '
             placeholder='Enter Title'
             onChange={(e)=>setTitle(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="titleImg" className='uppercase text-[13px] font-bold text-gray-500'>Title Image</label>
            <input
             type="url"
             className='text-[15px] outline-none border pl-4 rounded-lg p-2 placeholder:text-[14px]  '
             placeholder='http://'
             onChange={(e)=>setTitleImg(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="subtitle" className='uppercase text-[13px]  font-bold text-gray-500'>Sub Title</label>
            <input
             type="text"
             className='text-[15px] border-2 pl-4 rounded-lg p-1 placeholder:text-[14px]  '
             placeholder='Enter SubTitle'
             onChange={(e)=>setSubTitle(e.target.value)}
            />
          </div>
          <Reactdraft setContent={setDraft} />
          <div>
          <Switch defaultChecked label={`${active?'Enable':"Disable"}`} onChange={()=>setActive(!active)} />
          </div>
          <div>
          <Select  color="blue" value={type} onChange={handleTypeChange} label="Select Type" >
            <Option value='IT'>Information Technology</Option>
            <Option value='POLITIC'>Politic</Option>
            <Option value='SOCIAL'>Social</Option>
          </Select>
          </div>
        <div className='flex items-center gap-10 mt-5'>
          <button onClick={()=>setPage('dashboard')} className='text-[14px] py-2 px-6 rounded-md duration-300 hover:bg-gray-800 bg-black text-white'>Cancel</button>
        <button onClick={handleSubmit} className='outline-none hover:bg-blue-900 duration-300 hover:duration-300 w-full bg-blue-700 p-2 font-bold text-white rounded-md'>Add </button>
        </div>
      </div>
      {success && <SuccessOverlay text="A post add Successfully!" onClose={handleClose} />}
    </div>
  );
}

export default AddNews;
