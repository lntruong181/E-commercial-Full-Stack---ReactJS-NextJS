import {createContext, useReducer} from 'react'
import reducers from './Reducers'

export const DataContext = createContext()

export const DataProvider = ({children}) => {

    const initialState =  { notify: {}, auth: {}}
    const [state, dispath] = useReducer(reducers, initialState)
    return (
        <DataContext.Provider value={[state,dispath]}>
            {children}
        </DataContext.Provider>
    )
}