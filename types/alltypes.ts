export type cycleType = {
    id:number,
    sellor:number,
    bike_name:string,
    description:string,
    brand:string,
    category:string,
    bike_image:string,
    stock:number,
    price:number,
    discount:number,
    delivery_time:number,
    total_sold:number
}
export type cart ={
    id:number,
    user:number,
    cycle:number,
    quantity:number
}
export type getCartCycle =  cycleType & {date_sell:string}

export type getCart = {
    id:number,
    user:number,
    cycle:getCartCycle,
    quantity:number
}
export type userProfile = {
    city?: string,
    country?: string,
    phone?:string,
    id?: number,
    pin?: string,
    state?: string,
    street_address?: string,
    user?: number
  }
  export type user = {
    first_name?:string,
    last_name?:string,
    is_staff?:boolean,
    id?:number,
    email?:string
  }

export type progressOrder = {
    id:number,
    user:user,
    cycle:cycleType,
    quantity: number,
    total_payment:number,
    user_phone: string,
    shipping_address: string,
    payment_method: string,
    order_date: string,
    delivery_date: string
}
type user_orders_in_progress = Omit<progressOrder, "user"> 
type single_user = {
    user:number
}
export type user_orders = user_orders_in_progress & single_user