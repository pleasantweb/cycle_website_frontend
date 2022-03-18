import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import { API_URL } from '../../../config'

type Data = {
  error?: string,
  user?:object

}

const user =async(req: NextApiRequest, res: NextApiResponse<Data>)=>{

    if(req.method === 'GET'){
        const cookies = cookie.parse(req.headers.cookie ?? '')
        const access = cookies.access ?? 'false'
        if(access === 'false'){
            return res.status(401).json({
                error:'User unauthorised to make this request'
            })

        }else{
            try{
            const apiRes = await fetch(`${API_URL}/auth/users/me/`,{
                method: 'GET',
                headers:{
                    'Accept':'application/json',
                    'Authorization':`JWT ${access}`
                }
            })
            const data = await apiRes.json()
            // console.log(data);
            if(apiRes.status === 200){
                return res.status(200).json({
                    user:data
                })
            }else{
                return res.status(apiRes.status).json({
                    error:data.error
                })
            }
        }catch(err){
            return res.status(500).json({
                error:'Something went wrong when retreiving user'
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
export default user;