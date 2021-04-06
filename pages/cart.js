import Head from 'next/head'
import Link from 'next/link'
import {useContext, useState, useEffect} from 'react'
import {DataContext} from '../store/GlobalState'
import CartItem from '../components/CartItem'
import {getData} from '../utils/fetchData'


const Cart = () => {
    const [state, dispatch] = useContext(DataContext)
    const {cart, auth} = state

    const [total, setTotal] = useState(0)
    const [callback, setCallback] = useState(false)

    //tính total
    useEffect(()=>{
        const getTotal = () => {
            const res = cart.reduce((prev, item) => {
              return prev + (item.price * item.quantity)
            },0)
      
            setTotal(res)
          }
      
          getTotal()
    },[cart])

    //update cart local khi db thay đổi
    useEffect(() => {
        const cartLocal = JSON.parse(localStorage.getItem('__cart_by_dev_hung'))
        if(cartLocal && cartLocal.length > 0){
          let newArr = []
          const updateCart = async () => {
            for (const item of cartLocal){
                const res = await getData(`product/${item._id}`)
                const { _id, title, images, price, inStock, sold } = res.product
                //sp con hang ton kho => push vao newArray / outStock sẽ không push vào/. cart = newArray
                //sp outStock sẽ tự xóa khỏi cart
                if(inStock > 0){
                  newArr.push({ 
                    _id, title, images, price, inStock, sold,
                    quantity: item.quantity > inStock ? 1 : item.quantity
                  })
                }
            }
            dispatch({ type: 'ADD_CART', payload: newArr })
          }
    
          updateCart()
        } 
      },[callback])

    useEffect(() => {
      
    },[])

    if(cart.length ===0 ) return(
        <div className="container-fluid mt-100">
          <div className="row">
              <div className="col-md-12">
                  <div className="card">
                      
                      <div className="card-body cart">
                          <div className="col-sm-12 empty-cart-cls text-center"> <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" className="img-fluid mb-4 mr-3"/>
                              <h3><strong>Your Cart is Empty</strong></h3>
                              <h4>Add something to make me happy :)</h4> <a href="/collection" className="btn btn-primary cart-btn-transform m-3" data-abc="true">Continue shopping</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    );
    return (
        <div style={{marginLeft:'10%', marginRight:'10%', marginTop: '30px'}}>
        <Head>
          <title>Cart Page</title>
        </Head>

    
          <h2 className="text-uppercase">Shopping Cart</h2>

          <table className="table my-3">
            <tbody>
              {
                cart.map(item => (
                  <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
                ))
              }
            </tbody>
          </table>
          <div className="row mx-auto">
          <div className="col-md-8 text-secondary table-responsive my-3"></div>
        <div className="col-md-4 my-3 text-right text-uppercase text-secondary">

            <h3>Total: <span className="text-danger">${total}</span></h3>

            
            <Link href={auth.user ? '/checkout' : '/signin'}>
              <a className="btn btn-dark my-2">Checkout</a>
            </Link>
            
        </div>
          </div>
          
      </div>
    )
}
export default Cart