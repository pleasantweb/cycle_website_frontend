import React, { useContext, useEffect, useState } from 'react'
import styles from '../../styles/Cycle.module.scss'
import { BsCart3 } from "react-icons/bs";
import Image from 'next/image';
import { useRouter } from 'next/router';
import randomstring from 'randomstring'
import { MdDelete } from "react-icons/md";
import { getCart} from '../../types/alltypes';
import FetchOrders from '../../component/fetchorder/FetchOrders';
import FullLayout, { userContextHook } from '../../hoc/FullLayout';


const UserCart = () => {

  const router = useRouter()

  const currenetUser = useContext(userContextHook)
  const {isAuthenticated,user,cart,userProfile} = currenetUser

  console.log(userProfile);
  
  
  const [cartData,setCartData] = useState<getCart[]>([])
 

  useEffect(()=>{
    if(cart && cart.length >  0){
    setCartData(cart)
    }

  },[cart])




  const buy_item=async(cycleid:number,quantity:number,id:number)=>{
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
    const buy_item_str = randomstring.generate()
    const body = JSON.stringify({buy_item_str})
    const res = await fetch(`${SITE_URL}/api/shop/paymentmethod`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:body
    })

    if(res.status === 200){
    await router.push(`/payment/buycycle/proceed?cartid=${id}&cycleid=${cycleid}&cycle_count=${quantity}&item_buy=${buy_item_str}`)
    }
  }

const remove_item_from_cart=async(cartid:number)=>{
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  const res = await fetch(`${SITE_URL}/api/shop/removecart/${cartid}`,{
    method:"DELETE"
  })
  if(res.status === 204){
    setCartData(cartData.filter(v=>v.id !== cartid))
  }
  
}

  return (
    <section  className={styles.cart_page}>
        <div className={styles.heading}>
          <h1>CART <BsCart3 /></h1>
          {Object.entries(user).length !== 0 && user.constructor === Object ? (<h2>{user ? (`${user.first_name}  ${user.last_name}`):('')}</h2>):('')}
          
        </div>
        <div className={styles.address}>
          <div className={styles.left}>
            
          <h3>Shipping address</h3>
          <div className={styles.user_address}>
          {Object.entries(userProfile).length !== 0 && userProfile.constructor === Object ? (
          <>
           <p>{userProfile.phone}</p>
          <p>{userProfile.street_address}, {userProfile.city}, {userProfile.state}, {userProfile.country}, {userProfile.pin}</p>
          </>
          ):(<h4>No Address added</h4>)}
         
            </div>
            </div>
            <div className={styles.right}>
              <button onClick={()=>router.push('/profile')} className={styles.edit_btn}>Edit Address</button>
              </div>
          </div>
        <div className={styles.carts}>
          {cartData.length > 0 ? (
            cartData.map(({quantity,cycle,id},i)=>(
          <div key={i} className={styles.cart}>
               <div className={styles.cycle_image}>
                 <Image src={cycle.bike_image} layout='fill' alt={cycle.bike_name} />
                    
               </div>
               <div className={styles.details}>
                    <h1>{quantity} {cycle.bike_name}</h1>
                    <h3>{cycle.category}</h3>
                    <h5>{cycle.delivery_time} Days delivery</h5>
                  
                    {/* <button onClick={()=>router.push(`/payment/buycycle/proceed?cycleid=${cycle.id}&cycle_count=${quantity}`)}  className={styles.buy}>Rs.{quantity * cycle.price}</button> */}
                    <button onClick={()=>buy_item(cycle.id,quantity,id)}  className={styles.buy}>Rs.{quantity * cycle.price}</button>
               </div>
               <div className={styles.remove_cart} >
                 <MdDelete onClick={()=>remove_item_from_cart(id)} title='Remove item' />
                 </div>
           </div>
            ))
          ):(<h1 className={styles.no_cart}>No Item in Cart</h1>)}
          
        </div>

        <FetchOrders />

    </section>
  )
}

export default UserCart;

UserCart.getLayout = function getLayout(page:typeof UserCart){
    return <FullLayout>{page}</FullLayout>
}