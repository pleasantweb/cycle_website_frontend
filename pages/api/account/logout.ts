import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

type Data = {
    message?: string,
    error?:string
}

const logout =async(req: NextApiRequest, res: NextApiResponse<Data>)=>{
    if(req.method === 'POST'){
        res.setHeader('Set-Cookie',[
            cookie.serialize('access','',{
                httpOnly:true,
                secure : false,
                maxAge :0,
                sameSite: 'strict',
                path : '/api/'
            }),
            cookie.serialize('refresh','',{
                httpOnly:true,
                secure : false,
                maxAge : 0,
                sameSite: 'strict',
                path : '/api/'
            })
        ])
        return res.status(200).json({
            message:'Successfully logged out'
        })

    }else{
        res.setHeader('Allow',['POST'])
        return res.status(405).json({
            error:`Method ${req.method} is not allowed`
        })
    }
    
}
export default logout;