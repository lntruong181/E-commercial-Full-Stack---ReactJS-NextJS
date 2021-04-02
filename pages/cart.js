
import Head from 'next/head'
import {useContext, useEffect, useState} from 'react'
import {DataContext} from '../store/GlobalState'
import CartItem from '../components/CartItem'

const Cart = () => {

    const [state,dispatch] = useContext(DataContext)
    const {cart} = state

    const [total, setTotal] = useState(0)

    useEffect(() =>{
        const getTotal = ()=>{
            const res = cart.reduce((prev,item) =>{
                return prev + (item.price * item.quantity)
            },0)
            setTotal(res)
        }
        getTotal()

    },[cart])

    // useEffect(() =>{
    //     const cartLocal = JSON.parse(localStorage.getItem('__cart_by_dev_hung'));
    //     if(cartLocal && cartLocal.length >0) {
    //         let newArr = []
    //         const updateCart = async () => {
    //             const res = await getData (`/product/${item._id}`)
    //             const {_id,title,images,price,inStock} = res.product
    //             if(inStock >0)
    //             {
    //                 newArr.push({
    //                     _id,title,images,price,inStock, quantity: item.quantity > inStock - sold ? 1 : item.quantity
    //                 })
    //             }
    //         }
    //         updateCart()
    //         dispatch ({type : 'ADD_CART', payload: newArr})
    //     }
    // })

    if(cart.length === 0 )
    {
        return(
            <div>there is no item</div>
        )
    }
    return (
        <div >
            <title>Cart item</title>
            <div className ="col-md-9">
                
               <tbody>
                    {
                        cart.map(item => (
                            <CartItem key="item._id" item ={item} dispatch ={dispatch} cart ={cart}></CartItem>
                        ))
                     } 
                </tbody>
                   
            
            
            </div>
            <div >
                <tbody>
                    <h4>TOTAL:   
                         <span className="text-danger">
                          {total}
                        </span>
                    </h4>
                </tbody>

            </div>
            

        </div>
    )
}
export default Cart