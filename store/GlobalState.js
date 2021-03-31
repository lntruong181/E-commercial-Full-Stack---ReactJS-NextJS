import {createContext, useReducer, useEffect} from 'react'
import { getData } from '../utils/fetchData'
import reducers from './Reducers'

export const DataContext = createContext()

export const DataProvider = ({children}) => {

    const initialState =  { notify: {}, auth: {}, cart: []}
    const [state, dispatch] = useReducer(reducers, initialState)
    const {cart} = state

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

    return (
        <DataContext.Provider value={[state,dispatch]}>
            {children}
        </DataContext.Provider>
    )
}