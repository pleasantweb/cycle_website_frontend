import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import { API_URL } from '../../../config'
type Data = {
    message?: string,
    error?:string
}

const verify =async(req: NextApiRequest, res: NextApiResponse<Data>)=>{
    if(req.method === 'GET'){
        const cookies = cookie.parse(req.headers.cookie ?? '')
        const access = cookies.access ?? 'false'
        if(access === 'false'){
            return res.status(403).json({
                error: 'User forbidden from making the request'
            })
        }else{
            const body = JSON.stringify({token:access})
            try{
                const apiRes = await fetch(`${API_URL}/auth/jwt/verify/`,{
                    method: 'POST',
                    headers:{
                        'Accept': 'application/json',
                        'content-Type':'application/json'
                    },
                    body:body
                })
                if(apiRes.status === 200){
                    return res.status(200).json({
                        message: 'Authenticated Successfully'
                    })
                }else{
                    return res.status(apiRes.status).json({
                        error:'Failed to Authenticate'
                    })
                }
            }catch(err){
               return res.status(500).json({
                   error:'Something went wrong when trying to authenticate'
               })
            }
        }
    }else{
        res.setHeader('Allow',['GET'])
        return res.status(405).json({
            error:`Method ${req.method} is not allowed`
        })
    }
}
export default verify