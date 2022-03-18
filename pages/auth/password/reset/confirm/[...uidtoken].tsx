import React, { useContext, useState } from 'react'
import styles from '../../../../../styles/User.module.scss'
import { BiErrorCircle } from "react-icons/bi";
import { useRouter } from 'next/router';
import { API_URL } from '../../../../../config';
import FullLayout, { userContextHook } from '../../../../../hoc/FullLayout';

const PasswordResetConfirm = () => {
  const router = useRouter()
  const {uidtoken} = router.query
  
  const currenetUser = useContext(userContextHook)
   const {setAuthPage} = currenetUser
  
  const [newPass,setNewPass] = useState({
    new_password:"",
    re_new_password:""
  })
  const {new_password,re_new_password}= newPass
  const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setNewPass(prev=>(
      {
        ...prev,[e.target.name]:e.target.value
      }
    ))
  }
  const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(uidtoken){
      if(uidtoken.length >0){
        const uid = uidtoken[0]
        const token = uidtoken[1]
        const body = JSON.stringify({uid,token,new_password,re_new_password})
        const res = await fetch(`${API_URL}/auth/users/reset_password_confirm/`,{
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
  return (
    <section className={styles.reset_password}>
     <h1>Enter New Password</h1>
     <form action="" onSubmit={onSubmit}>

       <label htmlFor="password">New Password</label>
       <input type="password" name="new_password" value={new_password} onChange={onChange} id="new_password" />

       <label htmlFor="re_new_password">Confirm New Password</label>
       <div className={styles.re_pass}>
      
       <input type="password" name="re_new_password" value={re_new_password} onChange={onChange} id="re_new_password" />
       <div className={styles.pass_error}>
        {new_password !== re_new_password ? (  <BiErrorCircle />):('')}
          
        </div>
       </div>
       
       {new_password !== re_new_password ? ( <input type="submit" className={styles.disabled} disabled value="Save" /> ):(<input type="submit" value="Save" />)}
       

     </form>
    </section>
  )
}

export default PasswordResetConfirm;

PasswordResetConfirm.getLayout = function getLayout(page:typeof PasswordResetConfirm){
  return <FullLayout>{page}</FullLayout>
}