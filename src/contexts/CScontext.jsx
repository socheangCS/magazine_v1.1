import React, { createContext, useContext } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();
const CScontext = createContext();
const URI = process.env.REACT_APP_URI
const useCS = () => {
    return useContext(CScontext);
}

const CSprovider = ({ children }) => {
    const getData = async () => {
        try {
            const data = {
                aid: cookies.get('csadmintokenid'),
                fullname: cookies.get('csadmintokenname')
            }
            return data;
        } catch (err) {
            console.error(err);
        }
    }

    const setAdminData = async (data) => {
        try {
            cookies.set('csadmintokenid', data.token , {  maxAge: 24 * 60 * 60 });
            cookies.set('csadmintokenname', data.fullname, { maxAge: 24 * 60 * 60 });
            return 'success';
        } catch (err) {
            console.error(err);
        }
    }

    const signOut = async () => {
        try {
            cookies.set('csadmintokenid', '',  {  maxAge: -1 });
            cookies.set('csadmintokenname','',  { maxAge: -1});
            return 'success';
        } catch (err) {
            console.error(err);
        }
    }
    const signIn = async (data) =>{
       try{
        const res = axios.post(`${URI}/api/admin/signin`, data);
        return (await res).data
       }catch(err){
        console.error(err)
       }
    }
    const getPosts = async () => {
        try{
            const token = cookies.get('csadmintokenid');
            const res = axios.get(`${URI}/api/admin/getposts`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            return (await res).data
           }catch(err){
            if (err.response && err.response.status === 403) {
                cookies.set('csadmintokenid', '',  {  maxAge: -1 });
                cookies.set('csadmintokenname','',  { maxAge: -1});
            }
            console.log(err)
           }
    }
    const getLastHeadLines = async () => {
        try{
            const res = axios.get(`${URI}/api/user/lasthead`);
            return (await res).data
           }catch(err){
            console.log(err)
           }
    }
    const getPopularPosts = async () => {
        try{
            const res = axios.get(`${URI}/api/user/getpopularposts`);
            return (await res).data
           }catch(err){
            console.log(err)
           }
    }
    const getItPosts = async () => {
        try{
            const res = axios.get(`${URI}/api/user/it`);
            return (await res).data
           }catch(err){
            console.log(err)
           }
    }
    const getSocialPosts = async () => {
        try{
            const res = axios.get(`${URI}/api/user/social`);
            return (await res).data
           }catch(err){
            console.log(err)
          }
    }
    const getUserPosts = async () => {
        try{
            const res = axios.get(`${URI}/api/user/getposts`);
            return (await res).data
           }catch(err){
            console.error(err)
           }
    }
    const addPost = async (data) => {
        try{
            const token = cookies.get('csadmintokenid');
            const res = axios.post(`${URI}/api/admin/addpost`, data,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            return (await res).data
           }catch(err){
            console.error(err)
           }
    }
    const updatePost = async (data) => {
        try{
            const token = cookies.get('csadmintokenid');
            const res = axios.post(`${URI}/api/admin/updatepost`, data,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            return (await res).data
           }catch(err){
            console.error(err)
           }
    }
    const toggleActive = async (data) => {
        try{
            const token = cookies.get('csadmintokenid');
            const res = axios.get(`${URI}/api/admin/toggleactive/${data.id}/${data.item}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            return (await res).data
           }catch(err){
            console.error(err)
           }
    }
    const deletePost = async (data) => {
        try{
            const token = cookies.get('csadmintokenid');
            const res = axios.get(`${URI}/api/admin/deletepost/${data.id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            return (await res).data
           }catch(err){
            console.error(err)
           }
    }
    const updateView = async (data) => {
        try{
            const res = axios.post(`${URI}/api/user/updateview`, data);
            return (await res).data
           }
    }
    return (
        <CScontext.Provider value={{getPopularPosts,getLastHeadLines,getItPosts,getSocialPosts,updateView,getUserPosts,updatePost,deletePost,toggleActive,addPost,getPosts,signIn, signOut, getData, setAdminData }}>
            {children}
        </CScontext.Provider>
    )
}

export { CSprovider, useCS };
