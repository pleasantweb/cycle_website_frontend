import React, { useState } from 'react'
import styles from '../styles/AuthStyle.module.scss'
import Login from './componetns/Login'
import Register from './componetns/Register'
import {GiTireIronCross } from "react-icons/gi";
import CheckEmail from './componetns/CheckEmail';
import { IoMdBicycle } from "react-icons/io";
import PasswordChange from './componetns/PasswordChange';
import PasswordChangeEmail from './componetns/PasswordChangeEmail';
import CustomError from './componetns/CustomError';


type propType ={
  setOpenAuthPage:React.Dispatch<React.SetStateAction<boolean>>
}

const AuthLayout = (props:propType) => {

  const {setOpenAuthPage} = props

  const [activeAuthPage,setActiveAuthPage] = useState(1)

  const [loading,setLoading] = useState(false)
  

  const authSystem = [
    {
      id:1,
      name:'login'
    },
    {
      id:2,
      name:'register'
    },
    {
      id:3,
      name:'check_mail'
    },
    {
      id:4,
      name:"change_password"
    },
    {
      id:5,
      name:"check_mail_password"
    }
  ]

  return (
    <section className={styles.auth_layout}>
      <div className={styles.auth_layout_page}>
        <div className={styles.welcome_user}>
        <IoMdBicycle />
           <div className={styles.content}>
            
             <h1>Welcome</h1>   
             
             {activeAuthPage === 1 ? (<p>Not A User</p>):(
               activeAuthPage === 2 ? (<p>Already A User</p>):(
                 activeAuthPage === 3 ? (<p>Did't get Email...?</p>):(
                   activeAuthPage === 4 ? (<p>Not A User</p>):(
                     activeAuthPage === 5 ? (<p>Not A User</p>):(<p>Login to Continue</p>)
                   )
                 )
               )
             )}
             {activeAuthPage === 1  ? (<button onClick={()=>setActiveAuthPage(2)} className={styles.suggestion}>SIGN UP</button>):(
               activeAuthPage === 2 ? (<button onClick={()=>setActiveAuthPage(1)} className={styles.suggestion}>SIGN IN</button>):(
                 activeAuthPage === 3 ? (<button onClick={()=>setActiveAuthPage(2)} className={styles.suggestion}>SIGN UP</button>):(
                   activeAuthPage === 4 ? (<button onClick={()=>setActiveAuthPage(2)} className={styles.suggestion}>SIGN UP</button>):(
                     activeAuthPage === 5 ? (<button onClick={()=>setActiveAuthPage(2)} className={styles.suggestion}>SIGN UP</button>):(
                     <button onClick={()=>setActiveAuthPage(1)} className={styles.suggestion}>SIGN IN</button>)
                   )
                 )
               )
             )}
             
            </div>
        </div>
        <div className={styles.authForms}>
        
            <div  className={styles.authPage}>
              {activeAuthPage === 1 ? (<Login setLoading={setLoading} setActiveAuthPage={setActiveAuthPage} />):(
                activeAuthPage === 2 ? (<Register setLoading={setLoading} setActiveAuthPage={setActiveAuthPage} />):(
                  activeAuthPage === 3 ? (<CheckEmail />):(
                    activeAuthPage === 4 ? (<PasswordChange setLoading={setLoading} setActiveAuthPage={setActiveAuthPage} />):(
                      activeAuthPage === 5 ? (<PasswordChangeEmail />):(<CustomError />)
                    )
                  )
                )
              )}
              </div>
        
            
        </div>
        <div className={styles.remove_auth_layout}>
         
          <GiTireIronCross title='cancel' onClick={()=>setOpenAuthPage(false)}  />
        </div>

       {loading ? (
          <div className={styles.loading}>
              <div className={styles.load}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
          </div>
       ):('')}
        </div>
    </section>
  )
}

export default AuthLayout