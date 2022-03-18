import React, { useContext, useEffect, useState } from 'react'
import styles from '../styles/User.module.scss'
import {BsFillTelephoneFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { userProfile } from '../types/alltypes';
import FullLayout, { userContextHook } from '../hoc/FullLayout';

const Profile = () => {
  
  const currenetUser = useContext(userContextHook)
  const {user,userProfile} = currenetUser


  const [userPro,setUserPro]= useState<userProfile>({
    id:0,
    user:0,
    phone:"",
    street_address:"",
    city:"",
    state:"",
    country:"India",
    pin:""
  })
  const {phone,street_address,city,state,country,pin} = userPro
  
 const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setUserPro(prev=>(
        {...prev,[e.target.name]:e.target.value}
      ))
 }
 const form_open=(y:number)=>{
    
  window.scrollTo({
    top: y,
    behavior:'smooth'
  })
}
  const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
    e.preventDefault()
    const user_id = user.id
    const body = JSON.stringify({user_id,phone,street_address,city,state,country,pin})
    if(Object.entries(userProfile).length !== 0 && userProfile.constructor){
      const res = await fetch(`${SITE_URL}/api/profile/edituserprofile/${user_id}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:body
      })
    }else{
      const res = await fetch(`${SITE_URL}/api/profile/adduserprofile`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:body
      })
    }
    
  form_open(0)
    
  }

  
  useEffect(()=>{
    if(Object.entries(userProfile).length !== 0 && userProfile.constructor){
      setUserPro(userProfile)
    }
    
  },[userProfile])
  return (
    <section className={styles.profile}>
      {Object.entries(user).length !== 0 && user.constructor ? (
        <>
        <h1> {user.first_name} {user.last_name}</h1>
        <h2>{user.email}</h2>
        <hr />
        </>
      ):('')}
        

        <div className={styles.profile_container}>
          <div className={styles.current_address}>
          <h3>Current shipping address</h3>

            { phone !== "" && street_address !== "" ? (
              <>
              
              <div className={styles.phone}>
                <div className={styles.icon}><BsFillTelephoneFill />  </div>
                <p>{phone} </p>
              </div>
              <div className={styles.address}>
                <div className={styles.icon}><AiFillHome /> </div>
                <p>{street_address}, {city}, {state}, {country}, {pin}</p>
              </div>
              </>
            ):(<h1>No Address Added Yet</h1>)}
              
            </div>

            <button onClick={()=>form_open(630)} className={styles.add_address}>Add Address</button>

       <div className={styles.edit_address}>
        
          <form className={styles.openForm} action="" onSubmit={onSubmit}>

            <div className={styles.inp_div}>
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" onChange={onChange} maxLength={10} id='phone' value={phone} name="phone"  />
            </div>

            <div className={styles.inp_div}>
              <label htmlFor="street_address">Street Address</label>
              <input onChange={onChange} type="text" id='street_address' value={street_address} name='street_address' />
            </div>
           
           <div className={styles.inp_div}>
             <label htmlFor="city">City</label>
             <input onChange={onChange} type="text" id='city' value={city} name='city' />
           </div>

           <div className={styles.inp_div}>
             <label htmlFor="state">State</label>
             <input onChange={onChange} type="text" name='state' value={state} />
           </div>
            
            <div className={styles.inp_div}>
              <label htmlFor="country">Country</label>
              <input type="text" name='country' readOnly  defaultValue={country}  />
            </div>

            <div className={styles.inp_div}>
              <label htmlFor="pin">Pin</label>
              <input onChange={onChange} type="tel" maxLength={6} name="pin" id="pin" value={pin} />
            </div>
            <div className={styles.actions}>
            <input type="submit" value="Save" />
            <button type='button' className={styles.cancel_btn} onClick={()=>form_open(0)}>Cancel</button>
              </div>
            
          </form>
          </div> 
        </div>
    </section>
  )
}

export default Profile;

Profile.getLayout = function getLayout(page:typeof Profile){
    return <FullLayout>{page}</FullLayout>
}