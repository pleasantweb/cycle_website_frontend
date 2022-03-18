import React, { useContext } from 'react'
import styles from '../../../styles/User.module.scss'
import { useRouter } from 'next/router'
import { API_URL } from '../../../config'
import FullLayout, { userContextHook } from '../../../hoc/FullLayout'

const Activate = () => {
   const router = useRouter()
   const {uidtoken} = router.query

   console.log(router);
   

   
   const currenetUser = useContext(userContextHook)
   const {setAuthPage} = currenetUser
   
   const onActivate=async()=>{
       if(uidtoken){
           if(uidtoken.length > 0){
            const uid = uidtoken[0]
            const token = uidtoken[1]
            const body = JSON.stringify({uid,token})
            const res = await fetch(`${API_URL}/auth/users/activation/`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:body
            })
            
           
           if(res.status === 204){
               setAuthPage(true)
           }
            
            
           }

       }
      
      
   }
//    console.log(uid,token);
   
  return (
    <section className={styles.activate_account}>
        <button className={styles.activate_btn} onClick={onActivate}>Activate your account</button>
    </section>
  )
}

export default Activate;
Activate.getLayout = function getLayout(page:typeof Activate){
    return <FullLayout>{page}</FullLayout>
}