import React, {useContext} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {DataContext} from '../store/GlobalState'
import Cookie from 'js-cookie'

function NavBar(){

    const router = useRouter()

    const [state, dispath] = useContext(DataContext)
    const {auth, cart} = state

    const isActive = (r) => {
        if(r === router.pathname){
            return " active"
        }else{
            return ""
    }
    }
//Xử lý logout
    const handleLogout = () => {
        Cookie.remove('refreshtoken', {path: 'api/auth/accessToken'})
        localStorage.removeItem('firstLogin')
        //refresh auth
        dispath({type: 'AUTH', payload: {}})
        dispath({type: 'NOTIFY', payload: {success: 'Logged out'}})
    }

const loggedRouter = () => {
return (
        <li className={"nav-item pl-4 pl-md-0 ml-0 ml-md-4" + isActive('/#')}> <a className="nav-link dropdown-toggle"
            data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
            <img src={auth.user.avata} alt={auth.user.avata} style={{
                                borderRadius: '50%', width: '30px', height: '30px',
                                transform: 'translateY(-3px)', marginRight: '3px'
                            }} /> {auth.user.name}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link href="/profile">
                <a className="dropdown-item">Profile</a>
                </Link>

                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>

            </div>
        </li>

    )
}

return (

<div>
    <div className="hero-anime">

        <div className="navigation-wrap bg-light start-header start-style">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className="navbar navbar-expand-md navbar-light">

                            <a className="navbar-brand" href="/"><img src="/img/logostore1.png" alt="" /></a>

                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto py-4 py-md-0">
                                    <li className={"nav-item pl-4 pl-md-0 ml-0 ml-md-4" + isActive('/')}> <a
                                        className="nav-link" href="/">Home</a>
                                    </li>
                                    <li className={"nav-item pl-4 pl-md-0 ml-0 ml-md-4" + isActive('/#')}> <a
                                        className="nav-link dropdown-toggle" data-toggle="dropdown" href="#"
                                        role="button" aria-haspopup="true" aria-expanded="false">Product</a>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" href="/collection">All Product</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                        </div>
                                    </li>
                                    <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                        <a className="nav-link" href="#">Agency</a>
                                    </li>
                                    <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#"
                                            role="button" aria-haspopup="true" aria-expanded="false">Services</a>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                        </div>
                                    </li>
                                    <li className={"nav-item pl-4 pl-md-0 ml-0 ml-md-4" + isActive('/cart')}> <Link
                                        href="/cart">
                                        <a className="nav-link"> <i className="fas fa-shopping-cart position-relative"
                                                aria-hidden="true">
                                                <span className="position-absolute" style={{
                                        padding: '3px 6px',
                                        background: '#ed143dc2',
                                        borderRadius: '50%',
                                        top: '-10px',
                                        right: '-10px',
                                        color: 'white',
                                        fontSize: '14px'
                                    }}>
                                                    {cart.length}
                                                </span>
                                            </i> Cart
                                        </a>
                                        </Link>

                                    </li>
                                    {
                                    Object.keys(auth).length === 0
                                    ? <li className={"nav-item pl-4 pl-md-0 ml-0 ml-md-4" + isActive('/signin')}> <Link
                                        href="/signin">
                                        <a className="nav-link"> <i className="fas fa-user" aria-hidden="true"></i> Sign
                                            in
                                        </a>
                                        </Link>
                                    </li>
                                    : loggedRouter()
                                    }
                                </ul>
                            </div>

                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
)
}
export default NavBar