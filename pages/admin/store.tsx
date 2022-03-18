import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { API_URL } from '../../config';
import styles from '../../styles/Sellor.module.scss'
import { cycleType } from '../../types/alltypes';
import {BiEditAlt} from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/router';
import FullLayout, { userContextHook } from '../../hoc/FullLayout';


const Store = ({data}:InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const currenetUser = useContext(userContextHook)
    const {isAuthenticated,user} = currenetUser
    
    
    const router =useRouter()
    const [cycleData,setCycleData] = useState<cycleType[]>([])
    
    // && Object.entries(user).length !== 0 && user.constructor === Object 

    useEffect(()=>{
        if(isAuthenticated ){
            if(!user.is_staff){
               router.push('/')
            }
        }else{
            router.push('/')
        }
    },[user,isAuthenticated,router])

    useEffect(()=>{
        if(data){
            setCycleData(data)
        }
    },[data])

    const removeCycle=async(cycleid:number)=>{
        const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
       const okDelete=  window.confirm('This bike will going to be removed permanent.')
    
        if(okDelete){
            const res = await fetch(`${SITE_URL}/api/admin/removecycle/${cycleid}`,{
                method:"DELETE"
            })
          
            if(res.status == 204){
                if(data){
                   const newData= data.filter(v=>v.id !== cycleid)
                   setCycleData(newData)
                }
            }
        } 
    }
  return (
    <section className={styles.store}>
        <div className={styles.heading}>
        <h1>STORE</h1>
        </div>
        
        <div className={styles.allBikes}>
            {cycleData.length > 0 ? (
                cycleData.map((v,i)=>(
                 <article key={i}>
                     <div className={styles.image}>
                     <Image src={v.bike_image} layout='fill' alt={v.bike_name} />
                     </div>
                     <div className={styles.price_actions}>
                     <div className={styles.title_price}>
                         <p>{v.bike_name}</p> <p>Rs.{v.price}</p>
                     </div>
                     <div className={styles.actions}>
                      <BiEditAlt onClick={()=>router.push(`/admin/editcycle/${v.id}`)} title='Edit' /> <MdDelete onClick={()=>removeCycle(v.id)} title='Remove Bike' />
                     </div>
                     </div>
                 </article>
                ))
              
            ):('') }
           
        </div>
    </section>
  )
}

export default Store;
Store.getLayout = function getLayout(page:typeof Store){
    return <FullLayout>{page}</FullLayout>
}

export const getServerSideProps =async(context: any)=>{
    const res = await fetch(`${API_URL}/shop/cycle/`,{
        method:"GET"
    })
    const data:cycleType[] = await res.json()
    
    if(data){
        return {
            props:{data}
        }
    }else{
        return {
            props:{}
        }
    }
    
  
}