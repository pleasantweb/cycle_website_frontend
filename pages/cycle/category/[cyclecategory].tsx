import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../../config';
import FullLayout from '../../../hoc/FullLayout';
import styles from '../../../styles/Category.module.scss'
import { cycleType } from '../../../types/alltypes';

const CycleCategory = ({data}:InferGetServerSidePropsType<typeof getServerSideProps>) => {
   const router = useRouter()
   const {cyclecategory} = router.query
  const [cycleData,setCycleData]= useState<cycleType[]>([])
 
  const bike_categories= [
    {id:1,category:'mtb',name:'MTB BIKES'},
    {id:2,category:'road',name:'ROAD BIKES'},
    {id:3,category:'hybrid',name:'HYBRID BIKES'},
    {id:4,category:'fatbike',name:'FAT BIKES'},
    {id:5,category:'electric_bike',name:'E-BIKES'},
  
  ]
 
  useEffect(()=>{
    if(data){
      setCycleData(data)
    }
  },[data])

  return (
    <section className={styles.category_page}>
      <div className={styles.heading}>
        {cyclecategory ? (
          bike_categories.map((v,i)=>(
            v.category === cyclecategory ? (<h1 key={i}>{v.name}</h1>):('')
          ))
        ):('')}
      </div>
      <div className={styles.all_cycles}>
        {cycleData  && cycleData.length > 0 ? (
          cycleData.map((v,i)=>(
            <article key={i}>
               <div className={styles.image}>
                  <Image src={v.bike_image} layout='fill' alt={v.bike_name} />
                  <span className={styles.discount}>{v.discount}%</span>
               </div>
               <div className={styles.name_brand}>
                  <h2 className={styles.name}>{v.bike_name}</h2>
                  <h2 className={styles.brand}>{v.brand}</h2>
               </div>
              <div className={styles.price}>
                 <h2 className={styles.before_price}>Rs. {v.price}</h2>
                 <h2 className={styles.actual_price}>Rs. {(v.price - v.price * v.discount/100)}</h2>
              </div>
              <button onClick={()=>router.push(`/cycle/${v.id}`)} className={styles.check}>CHECK</button>
            </article>
          ))
        ):(<h1 className={styles.no_Data}>No Data Found</h1>)}
      </div>
       
    </section>
  )
}

export default CycleCategory;

CycleCategory.getLayout=function(page:typeof CycleCategory){
  return <FullLayout>{page}</FullLayout>
}

export const getServerSideProps =async(context:any)=>{
    const {cyclecategory} = context.query
    
    
  const res = await fetch(`${API_URL}/shop/cycle/?category=${cyclecategory}`,{
      method:"GET"
  })
  const data:cycleType[] = await res.json()
  // console.log(data);
 
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
