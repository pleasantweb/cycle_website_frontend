import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import { API_URL } from '../../../config'
type Data = {
    message?: string,
    error?:string
}
const buyproduct=async(req: NextApiRequest, res: NextApiResponse<Data>)=>{

    if(req.method === 'POST'){
        const {cartid,bought_item_str,user_id,cycle,quantity,total_payment,user_phone,shipping_address,payment_method,delivery_date} = req.body
       
        const user = user_id
        const body = JSON.stringify({user,cycle,quantity,total_payment,user_phone,shipping_address,payment_method,delivery_date})
console.log('body',body);

        const cookies = cookie.parse(req.headers.cookie ?? '')
        const access = cookies.access ?? 'false'
        if(access === 'false'){
            return res.status(401).json({
                error:'User unauthorised to make this request'
            })

        }else{
            try{
            const apiRes = await fetch(`${API_URL}/shop/orderprogress/`,{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`JWT ${access}`
                },
                body:body
            })
            
            if(apiRes.status === 201){
                res.setHeader('Set-Cookie',[
                    cookie.serialize('bought_item',bought_item_str,{
                        httpOnly:true,
                        secure : process.env.USE_HTTPS !== 'TRUE',
                        // maxAge :0,
                        sameSite:'strict',
                        path : '/'
                    }),
                    cookie.serialize('buy_item','',{
                        httpOnly:true,
                        secure : process.env.USE_HTTPS !== 'TRUE',
                        maxAge :0,
                        sameSite:'strict',
                        path : '/'
                    }),
                    
                ])


                const cartRemove = await fetch(`${API_URL}/shop/cartedit/${cartid}/`,{
                    method:"DELETE",
                    headers:{
                        'Authorization':`JWT ${access}`
                    },
                })
                console.log(cartRemove);
                

                return res.status(201).json({
                    message:"Item bought successfully"
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
export default buyproduct;