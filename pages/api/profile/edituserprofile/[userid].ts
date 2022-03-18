import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import { API_URL } from '../../../../config'

type Data = {
  error?: string,
  message?:string
 
}

const adduserprofile =async(req: NextApiRequest, res: NextApiResponse<Data>)=>{

    if(req.method === 'PUT'){
       const {userid} = req.query
       const userId = parseInt(userid.toString())
        const cookies = cookie.parse(req.headers.cookie ?? '')
        const access = cookies.access ?? 'false'
        const {user_id,phone,street_address,city,state,country,pin} = req.body
        const user = user_id
        const body = JSON.stringify({user,phone,street_address,city,state,country,pin})
        if(access === 'false'){
            return res.status(401).json({
                error:'User unauthorised to make this request'
            })

        }else{
            try{
            const apiRes = await fetch(`${API_URL}/shop/userprofile/${userId}/`,{
                method: 'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':`JWT ${access}`
                },
                body:body
               
            })
           
            
         
           
           
            if(apiRes.status === 200){
                return res.status(200).json({
                    message:"User profile added successfully",
                    
                })
            }else{
                return res.status(apiRes.status).json({
                    error:'Something went wrong when adding user profile'
                })
            }
        }catch(err){
            return res.status(500).json({
                error:'Something went wrong when adding user profile'
            })
        }
        }
    }else{
        res.setHeader('Allow',['PUT'])
        return res.status(405).json({
            error:`Method ${req.method} is not allowed`
        })
    }
}
export default adduserprofile;