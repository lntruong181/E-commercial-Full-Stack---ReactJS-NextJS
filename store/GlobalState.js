import {createContext, useReducer, useEffect} from 'react'
import { getData } from '../utils/fetchData'
import reducers from './Reducers'

export const DataContext = createContext()

export const DataProvider = ({children}) => {

    const initialState =  { notify: {}, auth: {}}
    const [state, dispath] = useReducer(reducers, initialState)

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if(firstLogin) {
            getData('auth/accessToken').then(res => {
                if(res.err) return localStorage.removeItem('firstLogin')

                dispath({
                    type: 'AUTH',
                    payload: {
                        token: res.access_token,
                        user: res.user
                    }
                })
            })
        }
    }, []);

    return (
        <DataContext.Provider value={[state,dispath]}>
            {children}
        </DataContext.Provider>
    )
}