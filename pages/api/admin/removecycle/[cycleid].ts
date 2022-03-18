import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import { API_URL } from '../../../../config'

type Data = {
    message?: string,
    error?:string
}

const cycledit=async(req: NextApiRequest, res: NextApiResponse<Data>)=>{
    if(req.method === 'DELETE'){
        const {cycleid} = req.query
        const id = parseInt(cycleid.toString())
      
        
        
        const cookies = cookie.parse(req.headers.cookie ?? '')
        const access = cookies.access ?? 'false'
        if(access === 'false'){
            return res.status(401).json({
                error:'User unauthorised to make this request'
            })

        }else{
            try{
                const apiRes = await fetch(`${API_URL}/shop/cycle/${id}/`,{
                    method:"DELETE",
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json',
                        'Authorization':`JWT ${access}`
                    },
                })
               
                if(apiRes.status === 204){
                    return res.status(204)
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
        res.setHeader('Allow',['DELETE'])
        return res.status(405).json({
            error:`Method ${req.method} is not allowed`
        })
    }
}
export default cycledit;