import React, { useContext, useState } from 'react'
import Layout, { userContext } from '../hoc/Layout'
import styles from '../styles/Sellor.module.scss'
import FullLayout, { userContextHook } from '../hoc/FullLayout'
import Image from 'next/image';
import { CloudImage } from '../component/fetchimage/CloudImage';

const NewCycle = () => {

    const currenetUser = useContext(userContextHook)
    const {isAuthenticated,user,cart,userProfile} = currenetUser
    

    const [imageUploading,setImageUploading] = useState(false)

    const [message,setMessage] = useState('')

    const [formClass, setformClass] = useState(false)
    const [bikeDetails,setBikeDetails] = useState({
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
    const {bike_name,description,brand,category,bike_image,stock,price,discount,delivery_time} = bikeDetails
    
   

    const onFormOpen=(x:boolean)=>{
        setformClass(x)
    }

//////////////////////////////////////////////////////////////////////////////////

    const onFileChange=async(e:React.ChangeEvent<HTMLInputElement>)=>{
        setImageUploading(true)
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
              
             if(imageUrl){

       setBikeDetails(prev=>(
           {
               ...prev,bike_image:imageUrl
           }
       ))
       setImageUploading(false)
               
            }
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
//////////////////////////////////////////////////////////////////////////////

    const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
        const sellor = user.id
        const total_sold = 0
        const body = JSON.stringify({sellor,bike_name,description,brand,category,bike_image,stock,price,discount,delivery_time,total_sold})
       
        
        const res = await fetch(`${SITE_URL}/api/admin/addcycle`,{
            method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:body
        })
        
        if(res.status === 201){
            setMessage('Your bike has been added successfully.')
            setformClass(false)
            
            setBikeDetails({
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
            window.scrollTo({
                top:0,
                behavior:'smooth'
            })
        }
    }
//////////////////////////////////////////////////////////////////////////////

  return (
   <section className={styles.sellorPage}>
       {message !== '' ? (
        <div className={styles.message}>
        <p>{message}</p>
        </div>
       ):('')}
      
      
       <button onClick={()=>{onFormOpen(true); setMessage('')}} className={formClass ? (`${styles.addNew} ${styles.hide}`):(`${styles.addNew}`)}>New Bike</button>

       <div className={formClass ? (`${styles.CycleForm} ${styles.openForm}`):(`${styles.CycleForm} ${styles.closeForm}`)}>
          
          <h1>New Bike</h1>
          
             
         <form action="" onSubmit={onSubmit}>
             <div className={styles.left}>
             <label htmlFor="bike_name">Bike Name</label>
             <input onChange={onChange} id="bike_name" value={bike_name} type="text" name="bike_name" placeholder='Bike name'  />
             
             <label htmlFor="description">Description</label>
             {/* <input onChange={onChange} id="description" value={description} type="text" name="description" placeholder='Description'  /> */}
             <textarea onChange={onTextChange} value={description} name="description" id="description" cols={30} rows={10}></textarea>

             <label htmlFor="brand">Brand</label>
             <input onChange={onChange} id='brand' value={brand} type="text" name="brand" placeholder='Brand'/> 
             
             <label htmlFor="category">Category</label>
             <select onChange={onCategoryChange} value={category} name="category" id="category">
                 <option value="mtb">MTB</option>
                 <option value="road">Road</option>
                 <option value="hybrid">Hybrid</option>
                 <option value="fatbike">Fat Bike</option>
                 <option value="electric_bike">Electric</option>
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
                <button type='submit'>Sell</button>
                <button onClick={()=>onFormOpen(false)}>Cancel</button>
            </div>    
             </div>

             <div className={styles.right}>
            
                 <label htmlFor="bike_image">Upload Bike Image</label>
                 <input type="file" name="image" onChange={onFileChange} id='bike_image'  />
                 <div className={styles.image}>
                     {imageUploading  ? (<h1>Uploading...</h1>):('')}
                     {bike_image && bike_image !== '' ? (
                        <Image src={bike_image} layout='fill' alt={bike_name} />
                     ):('')}
                     
                 </div>
             </div>
             
         </form>
       </div>

   </section>
  )
}

export default NewCycle;

NewCycle.getLayout = function getLayout(page:typeof NewCycle){
    return <FullLayout>{page}</FullLayout>
}