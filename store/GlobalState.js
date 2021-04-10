import {createContext, useReducer, useEffect} from 'react'
import { getData } from '../utils/fetchData'
import reducers from './Reducers'

export const DataContext = createContext()

export const DataProvider = ({children}) => {

    const initialState =  { notify: {}, auth: {}, cart: [], modal: {},orders: [], users: []}
    const [state, dispatch] = useReducer(reducers, initialState)
    const {cart, auth} = state

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if(firstLogin) {
            getData('auth/accessToken').then(res => {
                if(res.err) return localStorage.removeItem('firstLogin')

                dispatch({
                    type: 'AUTH',
                    payload: {
                        token: res.access_token,
                        user: res.user
                    }
                })
            })
        }
    }, []);

    useEffect(() => {
        const __cart_by_dev_hung = JSON.parse(localStorage.getItem('__cart_by_dev_hung'))
        if(__cart_by_dev_hung) dispatch({type: 'ADD_CART', payload: __cart_by_dev_hung})
    },[])

    useEffect(() => {
        localStorage.setItem('__cart_by_dev_hung',JSON.stringify(cart))
    },[cart])

    useEffect(() => {
        if(auth.token){
            getData('order' ,auth.token).then(res => {
                if(res.err) return dispatch({type: 'NOTIFY' , payload: {err: res.err}})
                dispatch({type: 'ADD_ORDERS' , payload: res.orders})
            })
            if(auth.user.role === 'admin')
                getData('user',auth.token).then(res =>{
                    if(res.err) return dispatch({type:"NOTIFY", payload : {error : res.err}})

                    dispatch({type: 'ADD_USERS' , payload: res.users})
                })
        }
        else{
            dispatch({type: 'ADD_ORDERS' , payload: []})
            dispatch({type: 'ADD_CART' , payload: []})
        }

    },[auth.token])

    return (
        <DataContext.Provider value={[state,dispatch]}>
            {children}
        </DataContext.Provider>
    )
}