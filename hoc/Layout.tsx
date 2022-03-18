import { useRouter } from 'next/router';
import { useEffect, useState,createContext } from 'react';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar'
import { API_URL } from '../config';
import { cart, getCart, user, userProfile } from '../types/alltypes';

type Props = {
    children?: React.ReactNode;
  };
interface Map {
  [key: string]: string 
}



type userContext ={
  isAuthenticated:boolean,
  user:user,
  cart:getCart[],
  userProfile:userProfile 
}

const demoObj :userContext= {
  isAuthenticated:false,
  user:{},
  cart:[],
  userProfile:{}
}



export const userContext = createContext<userContext>(demoObj)

const Layout = ({children}:Props) => {

  const router =useRouter()
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  const query = router.query
const state = query.state?.toString() ?? null
const code = query.code?.toString() ?? null

// console.log('state',state);
// console.log('code',code);

  const [userDetails,setUserDetails] = useState<userContext>({
    isAuthenticated:false,
    user:{},
    cart:[],
    userProfile:{}
  })
  const {user,cart} = userDetails

  const check_authenticated =async()=>{
    
    const res = await fetch(`${SITE_URL}/api/account/verify`,{
      method:"GET"
    })
   
    if(res.status === 200){
      setUserDetails(prev=>(
        {
          ...prev,isAuthenticated:true
        }
      ))
    }
  }
  
  const loadUser = async()=>{
    
    const res = await fetch(`${SITE_URL}/api/account/user`,{
      method:"GET"
    })
    const data = await res.json()
    if(data){
      setUserDetails(prev=>(
        {
          ...prev,user:data.user
        }
      ))
    }  
  }

  const googleAuthenticate=async(state:string,code:string)=>{
    const body = JSON.stringify({state,code})
    try{
      const res = await fetch(`${SITE_URL}/api/account/googlelogin`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
       body:body
      })
      console.log(res);
    //   const details:Map = {
    //     'state':state,
    //     'code':code
    // }
    // const formBody = Object.keys(details).map(key=>encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&')
   
    // console.log(formBody);
    //   const res = await fetch(`${API_URL}/auth/o/google-oauth2/?${formBody}`,{
    //     method:"POST",
    //     headers:{
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     credentials:'include'
    //   })
    //   const data = await res.json()
    //   console.log(res);
    //   console.log(data);
      
      
      
    }catch(err){

    }
  }
// console.log(userDetails);
// console.log(router);
// console.log('query',router.query);

  const getUserCart =async()=>{
    const res = await fetch(`${SITE_URL}/api/shop/getcart`,{
      method:"GET",
    })
    console.log(res);
    const cartdata =await res.json()
    console.log(cartdata);
    if(res.status === 200){
     setUserDetails(prev=>(
       {
         ...prev,cart:cartdata.data
       }
     ))
      }
  }

  const getUserProfile =async(userid:number)=>{
    const res = await fetch(`${SITE_URL}/api/profile/getuserprofile/${userid}`,{
      method:'GET',
    })
    console.log(res);
    const data =await res.json()
    console.log(data);
    setUserDetails(prev=>(
      {
        ...prev,userProfile:data.userProfile
      }
    ))
    
  }
console.log(userDetails);



  useEffect(()=>{
    check_authenticated()   
    loadUser()
    getUserCart()
   
    if(state && code){
        googleAuthenticate(state,code)     
    }

  },[router.asPath,state,code])

  useEffect(()=>{
    if(user){
      if(user.id){
      getUserProfile(user.id)
    }
  }
   
  },[user])

  return (
    <>
       
        <userContext.Provider value={userDetails}>
        {/* <Navbar cart={cart} /> */}
        {children}
        </userContext.Provider>
        <Footer />
    </>
  )
}

export default Layout;