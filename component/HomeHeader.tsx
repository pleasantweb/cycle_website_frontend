import styles from '../styles/Component.module.scss'
import Image from 'next/image'
import React, { useState } from 'react'
import { BsUpload } from "react-icons/bs";
import img from '../img/new1.jpg'

const HomeHeader = () => {
  
  return (
      <header className={styles.home_header}>
       <Image src={img} layout='fill' alt='bicycle header' priority />
       <div className={styles.best_deal}>
         <h1>Get The Best Deal <br /> on your dream <br /> <span>Bi-cycle</span></h1>
       </div>
          <div className={styles.content}>
            <h1>Your Cycle Shop <br /> right at <br /> your home</h1>
          </div>
        
          
      </header>
   
  )
}

export default HomeHeader