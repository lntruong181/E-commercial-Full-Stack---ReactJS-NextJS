import {useEffect, useRef} from 'react'


const paypalBtn = ({total, name, email, sdt, diachi, phuongxa, quanhuyen, tinhtp, state,dispatch}) => {
    const refPaypalBtn = useRef()
    const {cart, auth} = state

    useEffect(() => {
        paypal.Buttons({
            createOrder: function(data, actions) {
              // This function sets up the details of the transaction, including the amount and line item details.
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: '0.01'
                  }
                }]
              });
            },
            onApprove: function(data, actions) {
              // This function captures the funds from the transaction.
              return actions.order.capture().then(function(details) {
                // This function shows a transaction success message to your buyer.
                console.log(data)
                alert('Transaction completed by ' + details.payer.name.given_name);
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