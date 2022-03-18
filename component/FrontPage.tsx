import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import styles from '../styles/Component.module.scss'

const FrontPage = () => {
  const router = useRouter()
  return (
    <div className={styles.front_page}>
      <section className={styles.our_cycles}>
          <div className={styles.image}>
            <Image src='https://res.cloudinary.com/dcegcusvq/image/upload/v1647067889/bicycle/m3fx0ee9owpg8nog52wn.png' layout='fill' priority alt='cycle image' />
            </div>
           <div className={styles.details}>
               <h2>E-Bikes</h2>
               <p>The future is here</p>
               <button onClick={()=>router.push('/cycle/category/electric_bike')}>Check</button>
            </div>
           
      </section>
      <section className={styles.cycle_love}>
          <div className={styles.image}>
              <Image src='https://res.cloudinary.com/dcegcusvq/image/upload/v1647058051/bicycle/n0fqrqe031lnm4bppwzq.jpg' layout='fill' priority alt='cycle image' />
            </div>
            <div className={styles.details}>
                <h2>{`${"It's"}`} a <br /> Good Day <br /> to Ride</h2>
                <div className={styles.sign}><span>-my heart</span></div>
            </div>

      </section>
      <section className={styles.our_cycles_mtb}>
      <div className={styles.image}>
            <Image src='https://res.cloudinary.com/dcegcusvq/image/upload/v1647072916/bicycle/akthzifhhjlip6kgukz0.png' layout='fill' priority alt='cycle image' />
            </div>
           <div className={styles.details}>
               <h2>Mountain-Bikes</h2>
               <p>Ready to beat the hills</p>
               <button onClick={()=>router.push('/cycle/category/mtb')}>Check</button>
            </div>
    </section>
    <section className={styles.cycle_love_more}>
          <div className={styles.image}>
              <Image src='https://res.cloudinary.com/dcegcusvq/image/upload/v1647075355/bicycle/zjynjeuhqprku5mr0cmi.jpg' layout='fill' priority alt='cycle image' />
            </div>
            <div className={styles.details}>
                <h2>Flexibilty  <br /> Strength <br /> Stamina</h2>
                <div className={styles.sign}><span>- {`${"It's"} a machine`}</span></div>
            </div>

      </section>
      <section className={styles.our_cycles_hybrid}>
      <div className={styles.image}>
            <Image src='https://res.cloudinary.com/dcegcusvq/image/upload/v1647076414/bicycle/o8txc8fyjtysjamjicxm.png' layout='fill' priority alt='cycle image' />
            </div>
           <div className={styles.details}>
               <h2>Hybrid-Bikes</h2>
               <p>Sometimes you want everything</p>
               <button onClick={()=>router.push('/cycle/category/hybrid')}>Check</button>
            </div>
    </section>

    <section className={styles.cycle_love_tyre}>
          <div className={styles.image}>
              <Image src='https://res.cloudinary.com/dcegcusvq/image/upload/v1647078237/bicycle/prxdkldb5lfbwudtdvl8.jpg' layout='fill' priority alt='cycle image' />
            </div>
            <div className={styles.details}>
                <h2>Road Bikes <br /> for your perfect <br /> city ride </h2>
                {/* <div className={styles.sign}><span>-my heart</span></div> */}
                <button className={styles.see_bikes}>Check</button>
            </div>

      </section>

      <section className={styles.our_cycles_fat}>
      <div className={styles.image}>
            <Image src='https://res.cloudinary.com/dcegcusvq/image/upload/v1647079168/bicycle/zbyei7qrcsd1n8r45cja.png' layout='fill'  priority alt='cycle image'/>
            </div>
           <div className={styles.details}>
               <h2>Fat-Bikes</h2>
               <p>Yes, people notice it.</p>
               <button onClick={()=>router.push('/cycle/category/fatbike')}>Check</button>
            </div>
    </section>

    </div>
  )
}

export default FrontPage;