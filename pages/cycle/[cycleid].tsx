import React, { useContext, useState } from 'react'
import styles from '../../styles/Cycle.module.scss'
import { BsBicycle} from "react-icons/bs";
import { API_URL } from '../../config';
import { cycleType } from '../../types/alltypes';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import FullLayout, { userContextHook } from '../../hoc/FullLayout';

const Cycle = ({data}:InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const router = useRouter()
  
  const currenetUser = useContext(userContextHook)
  const {isAuthenticated,user,cart,userProfile,setAuthPage,get_user_cart} = currenetUser
  
    
  const [quantity,setQuantity]= useState(1)

  const [addedToCart,setAddedToCart] = useState(false)

 const onChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
  
    const cycle_number = parseInt(e.target.value)
     
  setQuantity(cycle_number)
 }

 const onAddCart=async(cycle:number)=>{
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  const userid = user.id
  const body = JSON.stringify({userid,cycle,quantity})
    const res = await fetch(`${SITE_URL}/api/shop/addtocart`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:body
    })
  
    if(res.status === 201){
      setAddedToCart(true)
      get_user_cart()
    }
 }
 
  
  return (
    <section className={styles.cyclepage}>
      {data ? (<>
        <article>
      <div className={styles.cycle_image}>
        <div className={styles.image_box}>
          <Image src={data.bike_image} layout='fill' alt={data.bike_name} />
        </div>
      </div>
      <div className={styles.cycle_details}>
        <h1 className={styles.title}>{data.bike_name}</h1>
        <div className={styles.review}>
        <p>No reviews Yet</p>
        {data.stock > 0 ? (<p>In Stock</p>):(<p>Out of Stock</p>)}
        
        </div>
        
        <div className={styles.description}>
          <p>{data.description}</p>
        </div>
        <div className={styles.brand_Category}>
          
           <h3>{data.brand}</h3>
           <BsBicycle />
         
          <h3>{data.category}</h3>
        
           
        </div>
        <div className={styles.price}>
          <h2>Rs. {data.price}</h2> <h2>Rs. {(data.price - data.price * data.discount/100)}</h2>
        </div>
        <div className={styles.delivery_time}>
          <p>Will be deliver in {data.delivery_time} days</p>
        </div>
        <div className={styles.add_Cart}>
         
         {isAuthenticated ? (data.stock > 0 ? (
            <button 
               disabled={addedToCart} 
               onClick={()=>onAddCart(data.id)}
               className={addedToCart ? (
                 styles.add_to_cart_disable):(
                   styles.add_to_cart)
                   }>{addedToCart ? ('Added'):('ADD to CART')}</button>
                   ):(<button 
                        disabled 
                        className={styles.add_to_cart_disable}
                        >Out of Stock</button>)):(
                        <button 
                            className={styles.add_to_cart} 
                            onClick={()=>setAuthPage(true)}
                            >ADD to CART</button>)}
    
        {/* {data.stock > 0 ? (<button disabled={addedToCart} onClick={()=>onAddCart(data.id)} className={styles.add_to_cart}>{addedToCart ? ('Added'):('ADD to CART')}</button>):(<button disabled className={styles.add_to_cart}>Out of Stock</button>)} */}

        <select disabled={addedToCart} name="quantity" value={quantity} onChange={onChange} id="quantity">
          <option value={1}>1</option>
          {data.stock > 1 ? (<option value={2}>2</option>):('')}
          {data.stock > 2 ?(<option value={3}>3</option>):('')}
          
        </select>

        </div>


      </div>
      </article>
      </>):('')}
      
    </section>
  )
}

export default Cycle;

Cycle.getLayout = function getLayout(page:typeof Cycle){
  return <FullLayout>{page}</FullLayout>
}

export const getServerSideProps =async(context: any)=>{
  const {cycleid} = context.query
  if(cycleid){
    const id = parseInt(cycleid?.toString())
    const res = await fetch(`${API_URL}/shop/cycle/${id}`,{
        method:"GET"
    })
    const data:cycleType = await res.json()
    return {
        props:{data}
    }
    }else{
        return {
            props:{}
        }
    }
}