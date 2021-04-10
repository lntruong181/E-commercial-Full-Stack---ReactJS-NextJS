import Link from 'next/link'
import PaypalBtn from './paypalBtn'
import {useContext, useState, useEffect} from 'react'
import {DataContext} from '../store/GlobalState'
import { patchData } from '../utils/fetchData'
import { updateItem } from '../store/Actions'

const OrderDetail = ({orderDetail, state, dispatch}) => {
    const {auth, orders} = state
    const handleDelivered = (order) => {
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        
        patchData(`order/delivered/${order._id}`,null, auth.token).then(res=>{
            if(res.err) return  dispatch({type: 'NOTIFY', payload: {error: res.err}})
            
            const { paid, dateOfPayment, method, delivered } = res.result

            dispatch(updateItem(orders, order._id, {...order, paid, dateOfPayment, method, delivered}, 'ADD_ORDERS'))
            return  dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        })
    }
    if(!auth.user) return null
    return (
        <>
            {
            orderDetail.map(order => (
            <div key={order._id} style={{margin: '20px auto'}} className="row justify-content-around">

                <div className="text-uppercase my-3" style={{maxWidth: '600px'}}>
                    <h1 className="text-break"><b>Order {order._id}</b></h1>
                    <hr/>
                    <div className="mt-4 text-secondary">
                        <h2 style={{textAlign:'center'}}><b>Shipping</b></h2>
                        <br/>
                        <p><b>Name:</b> {order.user.ten}</p>
                        <p><b>Email:</b> {order.user.email}</p>
                        <p><b>Address:</b> {order.address}</p>
                        <p><b>Mobile:</b> {order.mobile}</p>
                        <br/>
                        <div className={`alert ${order.delivered ? 'alert-success' : 'alert-danger'}
                        d-flex justify-content-between align-items-center`} role="alert">
                            {
                                order.delivered ? `Deliverd on ${order.updatedAt}` : 'Not Delivered'
                            }
                            {
                                auth.user.role === 'admin' && !order.delivered &&
                                <button className="btn btn-dark text-uppercase"
                                onClick={() => handleDelivered(order)}>
                                    Mark as delivered
                                </button>
                            }
                            
                        </div>
                        <hr/>
                        <h2 style={{textAlign:'center'}}><b>Payment</b></h2>
                        <br/>
                        {
                            order.method && <h6><b>Method:</b> <em>{order.method}</em></h6>
                        }
                        
                        {
                            order.paymentId && <p><b>PaymentId:</b> <em>{order.paymentId}</em></p>
                        }
                        <br/>
                        <div className={`alert ${order.paid ? 'alert-success' : 'alert-danger'}
                        d-flex justify-content-between align-items-center`} role="alert">
                            {
                                order.paid ? `Paid on ${order.dateOfPayment}` : 'Not Paid'
                            }
                            
                        </div>
                        <hr/>
                        <div>
                            <h2 style={{textAlign:'center'}}><b>Order Items</b></h2>
                            <br/>
                            {
                                order.cart.map(item => (
                                    <div className="row border-bottom mx-0 p-2 justify-content-betwenn
                                    align-items-center" key={item._id} style={{maxWidth: '550px'}}>
                                        <img src={item.images[0].url} alt={item.images[0].url}
                                        style={{width: '50px', height: '45px', objectFit: 'cover'}} />

                                        <h5 className="flex-fill text-secondary px-3 m-0">
                                            <Link href={`/product/${item._id}`}>
                                                <a>{item.title}</a>
                                            </Link>
                                        </h5>

                                        <span className="text-info m-0">
                                            {item.quantity} x ${item.price} = ${item.price * item.quantity}
                                        </span>

                                    </div>
                                ))
                            }
                        </div>

                    </div>

                </div>
                {
                    !order.paid && auth.user.role !== 'admin' &&
                    <div className="p-4">
                        <h2 className="mb-4 text-uppercase">Total: ${order.total}</h2>
                        <PaypalBtn order={order} />
                    </div>
                }        
                
                    
               
               
            </div>
            ))
        }

        </>
    )
}
export default OrderDetail