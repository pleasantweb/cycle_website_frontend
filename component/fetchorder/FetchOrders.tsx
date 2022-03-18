import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/Cycle.module.scss'
import { user_orders } from '../../types/alltypes'

const FetchOrders = () => {
    const [orderData,setOrderData] = useState<user_orders[]>([])
    useEffect(()=>{
        const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
        const fetch_orders=async()=>{
          const res  = await fetch(`${SITE_URL}/api/shop/getorderinprogress`,{
              method:"GET"
          })
         
          const data = await res.json()
        //   console.log(data);
          if(data){
              setOrderData(data.data)
          }
          
        }
        fetch_orders()
    },[])
    
    
  return (
    <div className={styles.fetch_order_component}>
         <div className={styles.heading}>
             <h2>Order in Progress</h2>
             </div>
             <div className={styles.orders}>
                 {orderData && orderData.length >0 ? (orderData.map((v,i)=>(
                    <article key={i} className={styles.order}>
                        <div className={styles.bike_name}>
                            <h3>{v.quantity} {v.cycle.bike_name}</h3>
                        </div>
                        <div className={styles.cycle_Detail}>
                           
                      <div className={styles.image}>
                        <Image src={v.cycle.bike_image} layout='fill' />  
                        </div>
                        <div className={styles.delivery_date}>
                            <h4>Your order will be delivered on <br /> <span>{v.delivery_date}</span> </h4>
                        </div>
                        <div className={styles.ship_address}>
                            <h5>Address</h5>
                        <p>{v.shipping_address}</p>
                        </div>
                        <div className={styles.payment_method}>
                            <h5>Payment</h5>
                            <h4>{v.payment_method}</h4>
                            </div>
                            </div>
                    </article>   
                 ))):(<h1>No Item to show</h1>)}
             
                 </div>
        
       
    </div>
  )
}

export default FetchOrders;