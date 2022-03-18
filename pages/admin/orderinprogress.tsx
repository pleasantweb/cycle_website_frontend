import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import FullLayout, { userContextHook } from '../../hoc/FullLayout';
import styles from '../../styles/Sellor.module.scss'
import { progressOrder } from '../../types/alltypes';

const OrderInProgress = () => {
  const [orderData,setOrderData] = useState<progressOrder[]>([])

  const router =useRouter()
  
  const currenetUser = useContext(userContextHook)
  const {isAuthenticated,user} = currenetUser

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
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
    const fetch_orders=async()=>{
      const res = await fetch(`${SITE_URL}/api/admin/orderprogress`,{
        method:'GET'
      })
     
      const data =await res.json()
    
      
      if(data){
        setOrderData(data.order_data)
      }
      
    }
    fetch_orders()
  },[])
 
  
  return (
    <section className={styles.order_in_progress}>
        <div className={styles.heading}>
            <h1>Order to be delivered</h1>    
        </div>
        <div className={styles.orders}>
          {orderData && orderData.length > 0 ? ( orderData.map((v,i)=>(
            <article key={i}>
              <div className={styles.bike_image}>
                 <Image src={v.cycle.bike_image} layout='fill' alt={v.cycle.bike_name} />
                </div>
                <div className={styles.user_details}>
                <h3>{`${v.user.first_name} ${v.user.last_name}`}</h3> 
                <p>{v.shipping_address}</p> 
                </div>
                <div className={styles.bike_quantity_date}>
                <h4>{v.delivery_date}</h4>
                  <p>{v.quantity} bike</p>
                  </div>
               <div className={styles.price}>
                 <h5>{v.payment_method}</h5>
                 <h5>Rs.{v.total_payment}</h5>
                 </div>

                <button className={styles.order_done_btn}>Order Done</button>
               </article>  
          ))
             
          ):(<h1>No Data Yet</h1>)}
        
        </div>
    </section>
  )
}

export default OrderInProgress;

OrderInProgress.getLayout= function getLayout(page:typeof OrderInProgress){
    return <FullLayout>{page}</FullLayout>
}

// export const getServerSideProps=async()=>{
//   const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
//    const res = await fetch(`${SITE_URL}/api/admin/orderprogress`,{
//      method:'GET'
//    })
//    console.log(res);
//    return {
//      props:{}
//    }
// }