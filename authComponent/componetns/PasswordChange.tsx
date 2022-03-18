import React, { useState } from 'react'
import styles from '../../styles/AuthStyle.module.scss'
import {AiOutlineMail } from "react-icons/ai";
import { API_URL } from '../../config';

type propType={
  setLoading:React.Dispatch<React.SetStateAction<boolean>>,
  setActiveAuthPage:React.Dispatch<React.SetStateAction<number>>
}

const PasswordChange = (props:propType) => {

  const {setLoading,setActiveAuthPage} = props

  const [email,setEmail]= useState('')
    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.target.value)
    }
    const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        const body = JSON.stringify({email})
        const res = await fetch(`${API_URL}/auth/users/reset_password/`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:body
        })
        if(res.status === 204){
          setLoading(false)
          setActiveAuthPage(5)
        }else{
          setLoading(false)
          setActiveAuthPage(6)
        }
       
        
    }
  return (
    <div className={styles.password_change}>
        <div className={styles.heading}>
            <h1>Enter your Registered Email</h1>
        </div>
        <form action="" onSubmit={onSubmit}>
        <div className={styles.inp}>
        <AiOutlineMail />
           <input value={email} onChange={onChange} required type="email" name="email" id="password_email" placeholder='email' />
           </div>
           <input type="submit" value="Send" />  
        </form>
    </div>
  )
}

export default PasswordChange