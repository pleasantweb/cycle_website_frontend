import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState } from 'react'
import AuthLayout from '../authComponent/AuthLayout';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import {check_authentication, fetchUser, getUserCart, getUserProfile} from '../fetchData/fetchuserdata';
import {  getCart, user, userProfile } from '../types/alltypes';


type Props = {
    children?: React.ReactNode;
};

type userContext ={
    isAuthenticated:boolean,
    user:user,
    cart:getCart[],
    userProfile:userProfile,
    setAuthPage:(bool:boolean)=>void,
    get_user_cart:()=>void
}

const demoUser = {
    isAuthenticated:false,
    user:{},
    cart:[],
    userProfile:{},
    setAuthPage:()=>{},
    get_user_cart:()=>{}
}

export const userContextHook = createContext<userContext>(demoUser)

const FullLayout = ({children}:Props) =>{
    const router = useRouter()

    const [user,setUser] = useState<user>({})
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const [userProfile,setUserProfile] = useState<userProfile>({})
    const [userCart,setUserCart] = useState<getCart[]>([])

    const [openAuthPage,setOpenAuthPage] = useState(false)

    
    
    function setAuthPage(bool:boolean){ 
        setOpenAuthPage(bool)
    }
        
    async function get_user_cart(){
        const user_cart = await getUserCart()
        if(user_cart && user_cart.length > 0){
            setUserCart(user_cart)
        }
    }

    const userContextValue :userContext= {
        isAuthenticated:isAuthenticated,
        user:user,
        cart:userCart,
        userProfile:userProfile,
        setAuthPage:(bool:boolean)=>setAuthPage(bool),
        get_user_cart:()=>get_user_cart()
    }

/////////////////////////////////////////////////////////////////////////////////

    useEffect(()=>{
        const fetch = async()=>{
            const userdata = await fetchUser()
            const verify_user = await check_authentication()
            
           if(userdata){
               setUser(userdata)
           }
           if(verify_user){
               setIsAuthenticated(true)
           }
        }
       fetch()
    
    },[router.asPath])

/////////////////////////////////////////////////////////////////////////////

    useEffect(()=>{      
        const fetch=async(id:number)=>{
            const user_profile=  await getUserProfile(id)
           
            if(user_profile){
                setUserProfile(user_profile)
            }
        }

        if(user && isAuthenticated){
            if(user.id){
               fetch(user.id)
            }
        }
    },[user,isAuthenticated])

 ////////////////////////////////////////////////////////////////////////////////

useEffect(()=>{
    // const fetch=async()=>{
    //     const user_cart = await getUserCart()
    //     if(user_cart && user_cart.length > 0){
    //         setUserCart(user_cart)
    //     }
        
    // }
    if(user && isAuthenticated){
        if(!user.is_staff){
            get_user_cart()
        }
    }

},[user,isAuthenticated])

 ////////////////////////////////////////////////////////////////////////////
   
  return (
    <>
    <div className='site_container'>
        
        {!isAuthenticated && openAuthPage ? (
            <AuthLayout setOpenAuthPage={setOpenAuthPage} />
        ):('')}

    <userContextHook.Provider value={userContextValue}>
        <Navbar cart={userCart} isAuthenticated={isAuthenticated} isStaff={user.is_staff ? (user.is_staff):(false)} user_name={user.first_name? (user.first_name):('')} setOpenAuthPage={setOpenAuthPage} />
        {children}
        <Footer />
    </userContextHook.Provider>
            
    </div>
    </>
  )
}

export default FullLayout;


