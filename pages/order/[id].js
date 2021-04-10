import Head from 'next/head'
import {useContext, useState, useEffect} from 'react'
import {DataContext} from '../../store/GlobalState'
import {useRouter} from 'next/router'
import OrderDetail from '../../components/OrderDetail'

const DetailOrder = () => {

    const [state, dispatch] = useContext(DataContext)
    const {orders, auth} = state

    const router = useRouter()
    const [orderDetail, setOrderDetail] = useState([])

    useEffect(() => {
        const newArr = orders.filter(order => order._id === router.query.id)
        setOrderDetail(newArr)
        
    }, [orders]);
    return (
        <div className="my-3">
        <Head>
            <title>Detail Orders</title>
        </Head>

        <div style={{marginLeft:'15%'}}>
            <button className="btn btn-dark" onClick={() => router.back()}>
                <i className="fas fa-long-arrow-alt-left"  aria-hidden="true"></i> Go Back
            </button>
        </div>
        
       
        <OrderDetail orderDetail={orderDetail}/>
     

    </div>
    )
}
export default DetailOrder