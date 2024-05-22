import React, { useEffect, useRef, useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useCS } from '../contexts/CScontext';
function Login() {
    const [fullname,setFullname] = useState('')
    const {signIn,setAdminData} = useCS()
    const pwRef = useRef()
    const nameRef= useRef()
    const [password, setPassword] = useState('');
    const [showpw,setShowpw] = useState(false)
    const navigate = useNavigate();
    const handleShowPassword = () =>{
        if(!showpw){
           pwRef.current.type='text' 
        }else{
            pwRef.current.type='password' 
        }
        setShowpw(!showpw);
    }
    const handleLogin = () => {
        if(!fullname){
            nameRef.current.className = 'border border-red-500 p-1 rounded-md pl-3  focus:outline-blue-500'
        }
        if(!password){
            pwRef.current.className = 'w-full border border-red-500 p-1 rounded-md pl-3  focus:outline-blue-500'
        }
        if(fullname && password){
            const form = {
                'fullname':fullname,
                'password':password
            }
            signIn(form).then((res)=>{
                if(res){
                setAdminData(res).then((res)=>{
                    if(res === 'success'){
                        navigate('/cs-admin');
                    }
                })
             }else{
                setFullname('')
                setPassword('')
             }
            })
        }
    }
     useEffect(()=>{
            nameRef.current.className = 'border border-gray-500 p-1 rounded-md pl-3  focus:outline-blue-500'
            pwRef.current.className = 'w-full border border-gray-500 p-1 rounded-md pl-3  focus:outline-blue-500' 
        },[fullname,password])


  return (
    <div className='w-full h-[99vh] flex flex-col bg-slate-100 items-center justify-center'>
        <div className='max-w-[500px] w-full bg-white p-4 gap-5 flex flex-col rounded-lg shadow-md'>
           <h1 className='text-center p-2 text-2xl '>Adminstrator Login</h1>
            <h1 className='text-[15px]'>Only Administrator account access is allowed. If you are not an Admin, <Link to='/' className='text-red-600'>please leave</Link>. If you want to try, you have to face the law.</h1>
            <div className='flex flex-col'>
                <label  className='text-[13px] font-medium' htmlFor="fullname">Fullname</label>
                <input ref={nameRef} className='border border-gray-500 p-1 rounded-md pl-3  focus:outline-blue-500' type="text" id="fullname" onChange={(e)=>setFullname(e.target.value)} />
            </div>
            <div className='flex flex-col'>
                <label className='text-[13px] font-medium' htmlFor="password">Password</label>
                 <div className='w-full flex justify-end '>
                     <input className='border border-gray-500 w-full p-1 rounded-md pl-3 pr-10 focus:outline-blue-500 ' ref={pwRef} type="password" id="password" onChange={(e)=>setPassword(e.target.value)} />
                  {showpw?<FaRegEyeSlash size={20} className='mt-[6px] mr-4  cursor-pointer absolute' onClick={handleShowPassword} />:<FaRegEye  size={20} className='cursor-pointer absolute mt-[6px] mr-4   ' onClick={handleShowPassword} />}
                 </div>
            </div>
            <div>
              {fullname&&password ? 
               <button  onClick={handleLogin}  className='w-full bg-cyan-500 p-2 rounded-md text-white hover:bg-cyan-700 duration-300 font-bold hover:duration-300'>Login</button>
               :
               <button  onClick={handleLogin} className='w-full bg-cyan-500 p-2 rounded-md text-white hover:bg-cyan-700 duration-300 font-bold hover:duration-300'>Login</button>
               }
              </div>
        </div>
    </div>
  )
}

export default Login