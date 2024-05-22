import React, { useState } from 'react'
import { CiTrash } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import Overlay from './Overlay';
import {useCS} from "../contexts/CScontext"
import SuccessOverlay from './SuccessOverlay';
function Action({adminData,item,setRefresh,setPage,setUpdateItems}) {
    const {deletePost} = useCS()
    const [msg,setMsg] = useState()
    const [checkDel,setCheckDel] = useState(false)
   const [isDel, setIsDel] = useState(false);
    const handleDelete = () =>{
         setIsDel(true)
    }
    const handleConfirm = () =>{
      setIsDel(false)
      const data = {
        id:item.id
      }
       deletePost(data).then((res)=>{
        if (res.status === "success"){
          setMsg('A post deleted!')
          setCheckDel(true)
          setRefresh((ref)=>!ref)
        }else{
          setMsg('A post delete faild1')
          setCheckDel(true)
        }
       })
    }
    const handleCancel = () =>{
        setIsDel(false)
    }
    const handleUpdate = () => {
        setPage('update');
        setUpdateItems(item)
    }
  return (
    <div className='flex gap-2 items-center'>
         <CiTrash  title='Delete' color='red'  className='cursor-pointer' onClick={handleDelete} size={22} />
         <FaRegEdit title='Edit' color='#036DDF' className='cursor-pointer' onClick={handleUpdate} size={20} />
        {checkDel&&   <SuccessOverlay text={msg} onClose={setCheckDel} /> }
         {isDel && <Overlay  text="Are you sure to delete?" onConfirm={handleConfirm} onCancel={handleCancel}/>}
    </div>
  )
}

export default Action