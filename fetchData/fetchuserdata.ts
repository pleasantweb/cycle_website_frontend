const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

export const fetchUser = async() => {
   
            const res = await fetch(`${SITE_URL}/api/account/user`,{
                method:"GET"
            })
            const data = await res.json()
             
    if(data){
        return data.user
    }
  return null
}

export const check_authentication =async()=>{
    const res = await fetch(`${SITE_URL}/api/account/verify`,{
        method:"GET"
      })
    if(res.status === 200){
        return true
    }else{
        return null
    }
}

export const getUserProfile =async(userid:number)=>{
    const res = await fetch(`${SITE_URL}/api/profile/getuserprofile/${userid}`,{
      method:'GET',
    })  
    const data =await res.json()
    
    if(res.status === 200 && data){
        return data.userProfile
    }else{
        return null
    }
     
  }

export const getUserCart =async()=>{
    const res = await fetch(`${SITE_URL}/api/shop/getcart`,{
      method:"GET",
    }) 
    const cartdata =await res.json()

    if(res.status === 200 && cartdata){
       return cartdata.data
      }else{
          return null
      }
  }

