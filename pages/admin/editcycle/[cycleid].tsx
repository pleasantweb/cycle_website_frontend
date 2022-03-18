import React, { useContext, useEffect, useState } from 'react'
import { CloudImage } from '../../../component/fetchimage/CloudImage'
import styles from '../../../styles/Sellor.module.scss'
import Image from 'next/image'
import {  InferGetServerSidePropsType } from 'next'
import { API_URL } from '../../../config'
import { cycleType } from '../../../types/alltypes'
import { useRouter } from 'next/router'
import FullLayout, { userContextHook } from '../../../hoc/FullLayout'

const EditCycle = ({data}:InferGetServerSidePropsType<typeof getServerSideProps>) => {
   
  const currenetUser = useContext(userContextHook)
  const {user} = currenetUser
    const router =useRouter()
   
    const [bikeDetails,setBikeDetails] = useState({
        id:0,
        bike_name:"",
        description:"",
        brand:"",
        category:"mtb",
        bike_image:"",
        stock:0,
        price:0,
        discount:0,
        delivery_time:0
    })

    useEffect(()=>{
        if(data){
       setBikeDetails({
        id:data.id,
        bike_name:data.bike_name,
        description:data.description,
        brand:data.brand,
        category:data.category,
        bike_image:data.bike_image,
        stock:data.stock,
        price:data.price,
        discount:data.discount,
        delivery_time:data.delivery_time
       })
       setImgSrc(data.bike_image)
    }

    },[data])

    const {id,bike_name,description,brand,category,bike_image,stock,price,discount,delivery_time} = bikeDetails
    
    const [imgSrc,setImgSrc] = useState('')

   
//////////////////////////////////////////////////////////////////////////////////

    const onFileChange=async(e:React.ChangeEvent<HTMLInputElement>)=>{
        let files : FileList | null = e.currentTarget.files
        const form_data = new FormData()
        let preset = process.env.NEXT_PUBLIC_PRESET
        if(preset){
         form_data.append('upload_preset',preset)
        }
        if(files !== null){
            if(files.length >0){
                form_data.append('file',files[0])
               const imageUrl =await CloudImage(form_data)
               
              setImgSrc(imageUrl)

       setBikeDetails(prev=>(
           {
               ...prev,bike_image:imageUrl
           }
       ))
               
            }
        }
    }
/////////////////////////////////////////////////////////////////////////////////

    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setBikeDetails(prev=>(
            {
                ...prev,[e.target.name]:e.target.value
            }
        ))
    }
    const onCategoryChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
       setBikeDetails(prev=>(
           {
               ...prev,category:e.target.value
           }
       ))

    }
    const onTextChange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setBikeDetails(prev=>(
            {
                ...prev,[e.target.name]:e.target.value
            }
        ))
    }
/////////////////////////////////////////////////////////////////////////
const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
    const sellor = user.id
    const total_sold = 0
    const body = JSON.stringify({id,sellor,bike_name,description,brand,category,bike_image,stock,price,discount,delivery_time,total_sold})
   
    
    const res = await fetch(`${SITE_URL}/api/admin/editcycle`,{
        method:"PUT",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:body
    })
    
    if(res.status === 200){
      router.push('/admin/store')

    }
}
//////////////////////////////////////////////////////////////////////////////

  return (
    <section className={styles.sellorPage}>
       
      
       <div className={`${styles.CycleForm} ${styles.openForm}`}>
          
          <h1>New Bike</h1>
          
             
         <form action="" onSubmit={onSubmit}>
             <div className={styles.left}>
             <label htmlFor="bike_name">Bike Name</label>
             <input onChange={onChange} id="bike_name" value={bike_name} type="text" name="bike_name" placeholder='Bike name'  />
             
             <label htmlFor="description">Description</label>
             {/* <input onChange={onChange} id="description" value={description} type="text" name="description" placeholder='Description'  /> */}
             <textarea onChange={onTextChange} name="description" id="description" value={description} cols={30} rows={10}></textarea>

             <label htmlFor="brand">Brand</label>
             <input onChange={onChange} id='brand' value={brand} type="text" name="brand" placeholder='Brand'/> 
             
             <label htmlFor="category">Category</label>
             <select onChange={onCategoryChange} value={category} name="category" id="category">
                 <option value="mtb">MTB</option>
                 <option value="road">Road</option>
                 <option value="hybrid">Hybrid</option>
                 <option value="fatbike">Fat Bike</option>
                 <option value="electric">Electric</option>
                 <option value="other">Other</option>
             </select>
             
             <label htmlFor="stock">Stock</label>
             <input onChange={onChange} id='stock' value={stock} type="number" name="stock"  placeholder='Stock'/>
             
             <label htmlFor="price">Price (Rs.)</label>
             <input onChange={onChange} id='price' value={price} type="number" name="price" placeholder='Price (Rs.)' />  
             
            <label htmlFor="discount">Discount (%) </label>
            <input type="number" name="discount" id="discount" value={discount} onChange={onChange} />
              
            <label htmlFor="delivery_time">Delivery Time (days)</label>
            <input type="number" name="delivery_time" id="delivery_time" value={delivery_time} onChange={onChange} />
              
             <div className={styles.actions}>
                <button type='submit'>Update</button>
                <button>Cancel</button>
            </div>    
             </div>

             <div className={styles.right}>
            
                 <label htmlFor="bike_image">Upload Bike Image</label>
                 <input type="file" name="image" onChange={onFileChange} id='bike_image'  />
                 <div className={styles.image}>
                     {imgSrc && imgSrc !== '' ? (
                        <Image src={imgSrc} width={400} height={400} alt={bike_name} />
                     ):('')}
                     
                 </div>
             </div>
             
         </form>
       </div>

   </section>
  )
}

export default EditCycle;

EditCycle.getLayout = function getLayout(page:typeof EditCycle){
    return <FullLayout>{page}</FullLayout>
}

export const getServerSideProps=async(context:any)=>{
   const {cycleid} = context.query
   if(cycleid){
   const id = parseInt(cycleid?.toString())
   const res = await fetch(`${API_URL}/shop/cycle/${id}`,{
       method:"GET"
   })
   const data:cycleType = await res.json()
   return {
       props:{data}
   }
   }else{
       return {
           props:{}
       }
   }
}