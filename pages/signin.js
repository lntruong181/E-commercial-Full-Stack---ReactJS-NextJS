import Link from 'next/link'
import {useState, useContext} from 'react'
import {DataContext} from '../store/GlobalState'
import {postData} from '../utils/fetchData'
import Cookie from 'js-cookie'

const Signin = () => {

    const initialState = { email: '',password: ''};
    const [userData,setUserData] = useState(initialState)
    const {email, password } = userData

    const [state, dispatch] = useContext(DataContext)
    
    const handleChangeInput = e =>{
        const {name, value} = e.target
        setUserData({...userData, [name]:value})
    }
    
    const handleSubmit = async e =>{
        //ko load lai trang
        e.preventDefault()
        
        const res = await postData('auth/login', userData)
        
        if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
        dispatch({ type: 'NOTIFY', payload: {success: res.msg} });
        dispatch({ type: 'AUTH', payload: {
            toke: res.access_token,
            user:  res.user
        } });
        
        Cookie.set('refreshtoken', res.refresh_token,{
            path:'api/auth/accessToken',
            expires: 7
        })
        localStorage.setItem('firstLogin', true)

    }

    return (
        <div className='signin'>
            <div className='body'>
            <div className="container">
                <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">Sign In</h5>
                        <form className="form-signin">
                        <div className="form-label-group">
                            <input type="email" id="inputEmail" name="email" value={email} onChange={handleChangeInput} className="form-control" placeholder="Email address" required autoFocus/>
                            <label htmlFor="inputEmail">Email address</label>
                        </div>

                        <div className="form-label-group">
                            <input type="password" id="inputPassword" name="password" value={password} onChange={handleChangeInput} className="form-control" placeholder="Password" required/>
                            <label htmlFor="inputPassword">Password</label>
                        </div>

                        <div className="custom-control custom-checkbox mb-3">
                            <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                            <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                        <hr className="my-4"/>
                        <p>You don't have an account? <Link href="/register"><a style={{color: 'crimson'}}>Register Now</a></Link></p>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}
export default Signin