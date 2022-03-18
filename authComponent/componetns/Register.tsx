import React, { useState } from 'react'
import styles from '../../styles/AuthStyle.module.scss'
import {AiOutlineMail } from "react-icons/ai";
import { HiOutlineLockClosed } from "react-icons/hi";
import { TiUserOutline } from "react-icons/ti";
import { API_URL } from '../../config';
import { BiErrorCircle } from "react-icons/bi";

type propType={
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    setActiveAuthPage:React.Dispatch<React.SetStateAction<number>>
}

const Register = (props:propType) => {
    const {setLoading,setActiveAuthPage}= props
    const [formValues,setFormValues] = useState({
        email:"",
        first_name:"",
        last_name:"",
        password:"",
        re_password:""
    })
    const {email,first_name,last_name,password,re_password} = formValues
    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormValues(prev=>(
            {
                ...prev,[e.target.name]:e.target.value
            }
        ))
     }
     
     const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        const body = JSON.stringify({email,first_name,last_name,password,re_password})
        const res = await fetch(`${API_URL}/auth/users/`,{
            method:"POST",
            headers:{
             'Accept': 'application/json',
             'Content-Type': 'application/json'
            },
            body:body
        })
        console.log(res);
        if(res.status === 201){
            setLoading(false)
            setActiveAuthPage(3)
        }else{
            setLoading(false)
            setActiveAuthPage(6)
           }  
     }

  return (
    <div className={styles.signup}>
        <div className={styles.heading}>
            <h1>SIGN UP</h1>
        </div>
            <form autoComplete='off' action="" onSubmit={onSubmit}>

                <div className={styles.inp}>
                    <AiOutlineMail />
                    <input type="email" required value={email} onChange={onChange} name="email" id="login_email" placeholder='email' />
                </div>
                
                <div className={styles.inp}>
                     <TiUserOutline />
                    <input type="text" required value={first_name} onChange={onChange} name="first_name" id="first_name" placeholder='first name' />   
                </div>

                <div className={styles.inp}>
                    <TiUserOutline />
                    <input type="text" required value={last_name} onChange={onChange} name="last_name" id="last_name" placeholder='last name' />  
                </div>

                <div className={styles.inp}>
                    <HiOutlineLockClosed />
                    <input type="password" required value={password} onChange={onChange} name="password" id="login_password" placeholder='password' />
                    {password.length > 0 && password.length < 6 ? (  <BiErrorCircle title='password length must be greater than 5' />):('')}
                </div>
                <div className={styles.inp}>
                    <HiOutlineLockClosed />
                    <input type="password" required value={re_password} onChange={onChange} name="re_password" id="login_re_password" placeholder='confirm password' />
                    {re_password.length > 0 && password !== re_password ? (  <BiErrorCircle title='password does not match' />):('')}
                </div>
                
                {password.length > 5 && password === re_password ? (
                     <input type="submit" value="SIGN UP" />):(
                        <input disabled className={styles.disabled} type="submit" value="SIGN UP" />
                     )}
               
            </form>    
    
    </div>
  )
}

export default Register;