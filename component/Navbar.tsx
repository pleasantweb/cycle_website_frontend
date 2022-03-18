import styles from '../styles/Component.module.scss'
import { BiUser } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { useRouter } from 'next/router';

import { ImProfile } from "react-icons/im";
import { AiFillLock } from "react-icons/ai";
import {GrUserAdmin } from "react-icons/gr";
import { IoIosBicycle } from "react-icons/io";
import { IoMdBicycle } from "react-icons/io";
import { useState } from 'react';

import { getCart} from '../types/alltypes'
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import user from '../pages/api/account/user';

type propType ={
  cart:getCart[],
  isAuthenticated:boolean,
  isStaff:boolean,
  user_name:string,
  setOpenAuthPage:React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar = (props:propType) => {
  const {cart,isAuthenticated,isStaff,user_name,setOpenAuthPage} = props

  const router = useRouter()
 
 const [openNav,setOpenNav] = useState(false)

 const bike_categories= [
  {id:1,category:'electric_bike',name:'E-bikes'},
  {id:2,category:'hybrid',name:'Hybrid'},
  {id:3,category:'mtb',name:'MTB'},
  {id:4,category:'road',name:'Road-bikes'},
  {id:5,category:'fatbike',name:'Fat-bikes'},
 
]
 
  const onSignout=async()=>{
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
    const res = await fetch(`${SITE_URL}/api/account/logout`,{
      method:"POST"
    })
   if(res.status == 200){
     router.reload()
   }
    
  }

  const onMouseHover=()=>{
   setOpenNav(true)
  }

  return (
    <nav onMouseLeave={()=>setOpenNav(false)} className={openNav ? (styles.navbar_open):(styles.navbar)}>
        <div className={styles.logo} onClick={()=>router.push('/')}><IoMdBicycle /> Cicilo</div>
        <ul className={styles.navOptions}>
         
        
          {isAuthenticated && isStaff ? (
            <>
            <li onClick={()=>router.push('/newcycle')}>sell</li>
            <li onClick={()=>router.push('/admin/store')}>store</li>
            </>
          ):('')}
         
          <li onMouseOver={onMouseHover} className={styles.hover_it}>bikes</li>
          
          {isAuthenticated ? (
            <>
            {isStaff ? (<li onClick={()=>router.push('/admin/orderinprogress')} >orders</li>):('')}
              <li onClick={onSignout}>logout </li>
              {!isStaff ? (<li className={styles.cartLogo} onClick={()=>router.push(`/cart/${user_name}`)}><BsCart3 /> {cart && cart.length > 0 ? (<span>{cart.length}</span>):('')} </li>):('')}
              
              </>
            ):( <li onClick={()=>setOpenAuthPage(true)}>login</li>)}
        </ul>

      <div className={styles.bikes_category}>
         <ul>
           {bike_categories.map((v,i)=>(
             <li key={i} onClick={()=>{router.push(`/cycle/category/${v.category}`); setOpenNav(false)}}>{v.name}</li>
           ))}
          
         </ul>
      </div>


        {/* <div className={styles.options}>
          <ul>
            <li onClick={()=>router.push('/profile')}> <ImProfile /> <p>Profile</p> </li>
           
           
          {isStaff ? (
            <>
            <li onClick={()=>router.push('/newcycle')}><IoIosBicycle /> <p>Sell</p> </li>
            <li onClick={()=>router.push('/admin/store')}><MdOutlineStoreMallDirectory /> <p>Store</p> </li>
            </>
          ):('')}
            
          </ul>
        </div> */}
    </nav>
  )
}

export default Navbar;