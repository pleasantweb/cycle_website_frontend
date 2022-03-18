import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import { API_URL } from '../../../config'
type Data = {
    message?: string,
    error?:string
}

const cycleadd=async(req: NextApiRequest, res: NextApiResponse<Data>)=>{
    if(req.method === 'POST'){
        const {sellor,bike_name,description,brand,category,bike_image,stock,price,discount,delivery_time,total_sold} = req.body
        const body = JSON.stringify({sellor,bike_name,description,brand,category,bike_image,stock,price,discount,delivery_time,total_sold})
        const cookies = cookie.parse(req.headers.cookie ?? '')
        const access = cookies.access ?? 'false'
        if(access === 'false'){
            return res.status(401).json({
                error:'User unauthorised to make this request'
            })

        }else{
            try{
                const apiRes = await fetch(`${API_URL}/shop/cycle/`,{
                    method:"POST",
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json',
                        'Authorization':`JWT ${access}`
                    },
                    body:body
                })
               
                if(apiRes.status === 201){
                    return res.status(201).json({
                        error:'Your cycle added successfully.'
                    })
                }else{
                    return res.status(400).json({
                        error:'Something went wrong when adding data.'
                    })
                }
            }catch(err){
                return res.status(500).json({
                    error:'Something went wrong when adding data.'
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
export default cycleadd;