import React, { useContext, useEffect, useState } from 'react'
import Layout, { userContext } from '../../../hoc/Layout';
import styles from '../../../styles/Payment.module.scss'
import { FaPaypal,FaWallet } from "react-icons/fa";
import { SiPaytm } from "react-icons/si";
import { TiTick } from "react-icons/ti";
import { API_URL } from '../../../config';
import { cycleType } from '../../../types/alltypes';
import { GetServerSideProps, InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import cookie from 'cookie'
import {BsFillTelephoneFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import upisvg from '../../../img/UPI-Logo-vector.svg'
import Image from 'next/image';
import randomstring from 'randomstring';
import FullLayout, { userContextHook } from '../../../hoc/FullLayout';

const ProceedPayment = ({data}:InferGetServerSidePropsType<typeof getServerSideProps>) => {
    console.log(data);
   
   const [cycleData,setCycleData] = useState<cycleType>({
    id: 0,
    sellor: 0,
    bike_name: '',
    description:'',
    brand: '',
    category: '',
    bike_image: '',
    stock: 0,
    price: 0,
    discount: 0,
    delivery_time:0,
    total_sold: 0,
   })

 useEffect(()=>{
     if(Object.entries(data).length > 2){
         setCycleData(data)
     }
 },[data])
   

    const router = useRouter()
    const {cartid,cycle_count} = router.query

    const currenetUser = useContext(userContextHook)
    const {isAuthenticated,user,cart,userProfile} = currenetUser



//   useEffect(()=>{
//     if(!isAuthenticated){
//         router.push('/')
//     }
//   },[isAuthenticated])

    const paymentMethods = [
        {
            id:0,
            name:"PayPal",
            value:"paypal"
        },
        {
            id:1,
            name:"upi Pay",
            value:"upipay"
        },
        {
            id:2,
            name:"Pay Cash",
            value:"cashpay"
        }
    ]

  const [activeId,setActiveId] = useState(2)

  const delivery_Date=(delivery_time:number,db_date:boolean)=>{
    const month_names = ["January","February","March","April","May","June","July","August","September","October","November","December"];
          const order_date = new Date(new Date().getTime()+(delivery_time*24*60*60*1000));
         const date =order_date.getDate()
         const month = order_date.getMonth()
         const year = order_date.getFullYear()
         console.log(year,month,date);
        if(db_date){
            return `${year}-${month}-${date}`
        }
         return month_names[month] + '  ' + date + ', ' + year
  }

  const bike_price = ()=>{
      const price = parseInt((cycleData.price - (cycleData.price * cycleData.discount/100)).toString())
      return price
  }

  const onPaymentProceed=async()=>{
      const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL 
      const bought_item_str = randomstring.generate()
      const user_id = user.id
      const cycle = cycleData.id
      const quantity = cycle_count ? (parseInt(cycle_count.toString())):(1) 
      const total_payment=  quantity * bike_price()
      const user_phone = userProfile.phone
      const shipping_address = `${userProfile.street_address}, ${userProfile.city}, ${userProfile.state}, ${userProfile.country}, ${userProfile.pin}`
      const payment_method = paymentMethods[activeId].value
    //   const order_date = delivery_Date(1)
      const delivery_date = delivery_Date(cycleData.delivery_time,true)
      const body = JSON.stringify({cartid,bought_item_str,user_id,cycle,quantity,total_payment,user_phone,shipping_address,payment_method,delivery_date})
      console.log(body);
      const res = await fetch(`${SITE_URL}/api/shop/buyproduct`,{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:body
      })
      console.log(res);
      if(res.status === 201){
  
         await router.push(`/payment/buycycle/orderinprogress?item_bought=${bought_item_str}`)
      }
      
  }

  return (
    <section className={styles.buycycle}>
        <div className={styles.item_inform}>
        {cycleData.id !== 0  ? (
            <h2><span>{cycle_count}</span> {cycleData.bike_name} bike worth <span> Rs.{cycle_count ? (bike_price() * parseInt(cycle_count.toString())):('') } </span>will be deliverd on {delivery_Date(cycleData.delivery_time,false)} at below address</h2>
        ):('')}
        
        {Object.entries(userProfile).length !== 0 && userProfile.constructor === Object ? (
        <div className={styles.user_address}>
            <div className={styles.user_add}>
                <BsFillTelephoneFill />
            <p>{userProfile.phone}</p>
            </div>
            <div className={styles.user_add}>
                <AiFillHome />
            <p>{userProfile.street_address}, {userProfile.city}, {userProfile.state}, {userProfile.country}, {userProfile.pin}</p>
                </div>
       
       
        </div>
        ):('')}

        </div>
        <div className={styles.payment_method}>
            <div className={styles.heading}>
            <h2>Payment Method</h2>
                </div>
         
           
           <div className={styles.payment_method_box}>
            <h3>Choose a payment method</h3>   
            <div className={styles.methods}>
            
            {paymentMethods.map((v,i)=>(
                <li key={i} className={activeId === v.id ? (styles.method_active):(styles.method) } onClick={()=>setActiveId(v.id)} >
                    {v.id === 0 ? (<FaPaypal />):(v.id === 1 ? (<Image src={upisvg} width={50} height={30} alt='upilogo' />):(<FaWallet />))}
                    <p >{v.name}</p>
                    <strong><TiTick /></strong>
                </li>
            ))}

     
            </div>
            <div className={styles.method_info}>
              {activeId === 0 ? (<h1>Pay with Paypal Account</h1>):(activeId === 1 ?(<h1>Pay with Paytm upi payment </h1>):(<h1>Cash on delivery</h1>))}    
            </div>
            <div className={styles.proceed}>
            <button onClick={onPaymentProceed} className={styles.proceed_btn}>Proceed</button>
                </div>
            
            </div>    
        </div>
    </section>
  )
}

export default ProceedPayment;
ProceedPayment.getLayout = function getLayout(page:typeof ProceedPayment){
    return <FullLayout>{page}</FullLayout>
}


export const getServerSideProps=async(context:any)=>{
    const cycle = context.query
   
    const cookies = cookie.parse(context.req.headers.cookie ?? '')
     
    const buy_item = cookies.buy_item ?? 'false'
   
    const {cycleid,cycle_count,item_buy} =cycle
   
    
    
  if (buy_item !== item_buy) {
    return {
      redirect: {
        destination: '/error/404error',
        permanent: false,
      },
    }
  }else{
    if(cycleid && cycle_count){
        const id = parseInt(cycleid.toString())
        const res = await fetch(`${API_URL}/shop/cycle/${id}`,{
            method:"GET"
        })
        const data:cycleType = await res.json()
       
        if(data){
            return {
                props:{data}
            }
        }else{
            return {
               props:{},
            }
        }
    }else{
        return {
            props:{},
        }
    }
   
}
    
}