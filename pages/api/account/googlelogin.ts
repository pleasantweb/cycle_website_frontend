import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import {API_URL} from '../../../config/index'

type Data = {
    message?: string,
    error?:string
}
interface Map {
    [key: string]: string 
  }

const googleapi =async(req: NextApiRequest, res: NextApiResponse<Data>)=>{
    if(req.method === 'POST'){
        const {state,code} = req.body
        const details:Map = {
            'state':state,
            'code':code
        }
        const formBody = Object.keys(details).map(key=>encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&')
       
        console.log(formBody);

        try{
            const apiRes = await fetch(`${API_URL}/auth/o/google-oauth2/?${formBody}`,{
                method:"POST",
                headers:{
                   
                   'Content-Type': 'application/x-www-form-urlencoded'
                },
                // credentials:'include'
                // body:body
            })
            const data = await apiRes.json()
            console.log(data);
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
export default googleapi;