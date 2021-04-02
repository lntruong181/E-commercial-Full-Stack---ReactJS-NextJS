import Head from 'next/head'
import Link from 'next/link'
import {decrease,increase} from '../store/Actions'

function CartItem ({item, dispatch, cart}){
    return (
        <div>
            <Head>
                <title>Cart Item</title>
            </Head>
            <tr >
              
                <td style={{maxWidth: "100px", overflow:"hidden"}}>
                    <img src={item.images[0].url}  
                    className="img-thumpnail w-100" style={{minWidth:"100px",height:"100px"}}></img>
                </td>
                <td style={{minWidth:'200px'}}>
                    <h5>
                        <Link href={`/product/${item._id}`}>
                            <a>{item.title}</a>   
                        </Link>
                    </h5>
                    <h6 className ="text-danger">
                        ${item.quantity * item.price}
                        {
                         item.inStock > 0 ?
                            <p className="text-danger">in Stock : {item.inStock}</p>
                            : <p className ="text-danger ">Out Stock</p>
                        
                        }

                    </h6>
                    
                </td>
                <div >
                    <td className="" style={{minWidth:'150px'}}>
                        <button onClick={ () => dispatch (decrease(cart,item._id)) }  disabled={item.quantity === 1 ? true: false}  
                        className="btn btn-outline-secondary">-</button>
                        <span className="px-3">{item.quantity}</span>
                        <button onClick={ () => dispatch (increase(cart,item._id)) } disabled={item.quantity === item.inStock ? true: false} 
                        className="btn btn-outline-secondary">+</button>


                    </td>
                    <td style={{minWidth:'50px',cursor:"pointer"}}>
                        
                            <i class="far fa-trash-alt text-danger" data-toggle="modal" data-target="#exampleModal" aria-hidden="true"
                            onClick={
                                () => dispatch({
                                    type: 'ADD_MODAL'
                                    ,payload:{data:cart,id: item._id,title: item.title}
                                })
                            }></i>
                      
                    
                    </td>
                </div>
                
            </tr>

            
            
           

        </div>
        
    )
}
export default CartItem