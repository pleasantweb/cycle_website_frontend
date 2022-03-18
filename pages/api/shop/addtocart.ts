import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import { API_URL } from '../../../config'
type Data = {
    message?: string,
    error?:string
}

const addtocart=async(req: NextApiRequest, res: NextApiResponse<Data>)=>{
    if(req.method === 'POST'){
        const {userid,cycle,quantity} = req.body
       
        
        const user = userid
        const body = JSON.stringify({user,cycle,quantity})


        const cookies = cookie.parse(req.headers.cookie ?? '')
        const access = cookies.access ?? 'false'
        if(access === 'false'){
            return res.status(401).json({
                error:'User unauthorised to make this request'
            })

        }else{
            try{
            const apiRes = await fetch(`${API_URL}/shop/cartedit/`,{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`JWT ${access}`
                },
                body:body
            })
            
            if(apiRes.status === 201){
                return res.status(201).json({
                    message:"Item Added to Cart"
                })
            }else{
                return res.status(apiRes.status).json({
                    error:"something went wrong"
                })
            }
        }catch(err){
            return res.status(500).json({
                error:'Something went wrong when retreiving user'
            })
        }
        }
    }else{
        res.setHeader('Allow',['POST'])
        return res.status(405).json({
            error:`Method ${req.method} is not allowed`
        })
    }
}
export default addtocart;