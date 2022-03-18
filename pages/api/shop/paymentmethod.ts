import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

type Data = {
    message?: string,
    error?:string
}

const paymentmethod =async(req: NextApiRequest, res: NextApiResponse<Data>)=>{
    if(req.method === 'POST'){ 
        const {buy_item_str} = req.body
       
        

        res.setHeader('Set-Cookie',[
            cookie.serialize('buy_item',buy_item_str,{
                httpOnly:true,
                secure : process.env.USE_HTTPS !== 'TRUE',
                // maxAge :0,
                sameSite:'strict',
                path : '/'
            }),
            
        ])
        return res.status(200).json({
            message:'proceed to pay payment'
        })
    }else{
        res.setHeader('Allow',['POST'])
        return res.status(405).json({
            error:`Method ${req.method} is not allowed`
        })
    }
    
}
export default paymentmethod;
// 3c234a0f-b74e-4135-bbe5-b99b4bef027b