import {useEffect, useRef, useContext} from 'react'
import {patchData} from '../utils/fetchData'
import {DataContext} from '../store/GlobalState'
import { updateItem } from '../store/Actions'


const paypalBtn = ({order}) => {
    const refPaypalBtn = useRef()
    const [state, dispatch] = useContext(DataContext)
    const {auth, orders} = state
 

    useEffect(() => {
        paypal.Buttons({
            createOrder: function(data, actions) {
              // This function sets up the details of the transaction, including the amount and line item details.
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: order.total
                  }
                }]
              });
            },
            onApprove: function(data, actions) {
              dispatch({ type: 'NOTIFY', payload: {loading: true} })
              // This function captures the funds from the transaction.
              return actions.order.capture().then(function(details) {
                console.log(details)
                //path data to api
                patchData(`order/payment/${order._id}`, {paymentId: details.payer.payer_id}, auth.token)
                    .then(res => {
                        //Thất bại => err
                        if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
                        
                        dispatch(updateItem(orders, order._id, {
                          ...order, paid: true, dateOfPayment: new Date().toISOString(), paymentId: details.payer.payer_id, method: 'Paypal'
                        }, 'ADD_ORDERS'))
                        dispatch({type: 'NOTIFY', payload: {success: res.msg}})
                       
                })
              });
            }
          }).render(refPaypalBtn.current);
    }, [])

    return (
        <div ref={refPaypalBtn}>

        </div>
    )

}
export default paypalBtn