import styles from '../styles/Component.module.scss'
import { IoMdBicycle } from "react-icons/io";
import { useRouter } from 'next/router';
import { AiOutlineCopyrightCircle } from "react-icons/ai";

const Footer = () => {

  const router = useRouter()

  const bike_categories= [
    {id:1,category:'electric_bike',name:'E-bikes'},
    {id:2,category:'hybrid',name:'Hybrid'},
    {id:3,category:'mtb',name:'MTB'},
    {id:4,category:'road',name:'Road-bikes'},
    {id:5,category:'fatbike',name:'Fat-bikes'},
   
  ]
  const current_year = ()=>{
    const date = new Date()
    const year = date.getFullYear()
    return year
    
  }
  return (
    <section className={styles.footer}>
      <div className={styles.footer_component}>

 
        <div className={styles.logo}>
        <IoMdBicycle /> <h1>Cicilo</h1>
        </div>
        <div className={styles.categories}>
        <ul>
           {bike_categories.map((v,i)=>(
             <li key={i} onClick={()=>router.push(`/cycle/category/${v.category}`)}>{v.name}</li>
           ))}
          
         </ul>
        </div>
        <div className={styles.aboutus}>
         <ul>
           <li>Privacy-Policy</li>
           <li>About Us</li>
         </ul>
        </div>
        <div className={styles.copyright}>
          <AiOutlineCopyrightCircle /> <h1>{current_year()}</h1>
        </div>
        </div>
    </section>
  )
}

export default Footer