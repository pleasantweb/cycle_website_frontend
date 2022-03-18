import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import {API_URL} from '../../../config/index'

type Data = {
    message?: string,
    error?:string
}
const login =async (req: NextApiRequest, res: NextApiResponse<Data>)=>{
// export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
    if(req.method === 'POST'){
         const {email,password} = req.body
         const body = JSON.stringify({email,password})
        

         try{
             const apiRes = await fetch(`${API_URL}/auth/jwt/create/`,{
                 method:"POST",
                 headers:{
                    'Accept': 'application/json',
                    'content-Type': 'application/json'
                 },
                 body:body
             })
             const data = await apiRes.json()
        
             if(apiRes.status === 200){
                res.setHeader('Set-Cookie',[
                    cookie.serialize('access',data.access,{
                        httpOnly:true,
                        secure : process.env.USE_HTTPS !== 'TRUE',
                        maxAge : 60*60*24,
                        sameSite: 'strict',
                        path : '/api/'
                    }
                    ),
                    cookie.serialize('refresh',data.refresh,{
                        httpOnly:true,
                        secure:process.env.USE_HTTPS !== 'TRUE',
                        maxAge:60*60*24,
                        sameSite:'strict',
                        path: '/api/'
                    }
                    )
                ])
                return res.status(200).json({
                    message:'Logged in Successfully'
                })
             }
             else{
                return res.status(apiRes.status).json({
                    error:'Authentication failed'
                })
            }
         }catch(err){
            return res.status(500).json({
                error: 'Something went wrong'
            })
         }
         

    }else{
        res.setHeader('Allow',['POST'])
        return res.status(405).json({
            error: `Method ${req.method} is not allowed`
        })
    }
    
}
export default login;
