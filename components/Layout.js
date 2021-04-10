import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'
import Modal from './Modal'
import Footer from './Footer'

function Layout({children}){
    return (
        <div>
            <Notify/>
            <NavBar/>
            <Modal/>
            <div style={{paddingTop:'5%'}}/>
            {children}
            <Footer/>
            
        </div>
    )
}
export default Layout