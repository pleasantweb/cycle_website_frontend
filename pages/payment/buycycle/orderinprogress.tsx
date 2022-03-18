import { GetServerSideProps } from 'next'
import React from 'react'
import styles from '../../../styles/Payment.module.scss'
import cookie from 'cookie'
import FullLayout from '../../../hoc/FullLayout'

const OrderInProgress = () => {
  return (
    <section className={styles.order_in_progress}>
      <div className={styles.content}>
      <h1>Congratulations !!!</h1>
          <h3>Your order is in progress</h3>
          <h4>Thank you for shopping with us! ...</h4>
        </div>
          
    </section>
  )
}

export default OrderInProgress;

OrderInProgress.getLayout = function getLayout(page:typeof OrderInProgress){
  return <FullLayout>{page}</FullLayout>
}

export const getServerSideProps : GetServerSideProps=async(context)=>{
    const orderquery = context.query
    const {item_bought} = orderquery
    const cookies = cookie.parse(context.req.headers.cookie ?? '')
     
    const bought_item = cookies.bought_item ?? 'false'
     console.log('check if bought true',item_bought === bought_item);
     if(item_bought !== bought_item){
       return {
         redirect:{
           destination:"/error/404error",
           permanent: false,
         }
       }
     }else{
   return {
       props:{}
   }
  }
}