import {useState, useContext, useEffect} from 'react'
import valid from '../utils/valid'
import {DataContext} from '../store/GlobalState'
import {postData} from '../utils/fetchData'
import {useRouter} from 'next/router'


const Register = () => {
    const initialState = {name: '', sdt: '', email: '', ngaySinh: '', gioiTinh: true, password: '', cf_password: ''};
    const [userData,setUserData] = useState(initialState)
    const {name , sdt, email, ngaySinh, gioiTinh, password, cf_password } = userData

    const [state, dispatch] = useContext(DataContext)
    const {auth} = state

    const router = useRouter()
    
    const handleChangeInput = e =>{
        const {name, value} = e.target
        setUserData({...userData, [name]:value})
        dispatch({ type: 'NOTIFY', payload: {} })
    }
    
    const handleSubmit = async e =>{
        //ko load lai trang
        e.preventDefault()
        const errMsg = valid(name , sdt, email, ngaySinh, gioiTinh, password, cf_password)
        if(errMsg){
            return dispatch({ type: 'NOTIFY', payload: {error: errMsg} })
        }
     
        dispatch({ type: 'NOTIFY', payload: {loading: true} })
        const res = await postData('auth/register', userData)
        
        if(res.err) {
           
            return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
        }
        return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })

    }

    useEffect(() => {
        //login success redirect home
        if(Object.keys(auth).length !== 0) router.push('/')
       
    }, [auth])

    return (
        <div className="signup">
            <div className="container">
                <div className="row">
                <div className="col-lg-10 col-xl-9 mx-auto">
                    <div className="card card-signin flex-row my-5">
                    <div className="card-img-left d-none d-md-flex">
                       
                    </div>
                    <div className="card-body">
                        <h5 className="card-title text-center">Register</h5>
                        <form className="form-signin" onSubmit={handleSubmit}>
                            <div className="form-label-group">
                                <input type="text" id="inputUserame" name="name" value={name} onChange={handleChangeInput} className="form-control" placeholder="Username"  autoFocus/>
                                <label htmlFor="inputUserame">Username</label>
                            </div>

                            <div className="form-label-group">
                                <input type="email" id="inputEmail" name="email" value={email} onChange={handleChangeInput} className="form-control" placeholder="Email address" />
                                <label htmlFor="inputEmail">Email address</label>
                            </div>
                            
                            <hr/>
                            <div className="form-label-group">
                                <input type="tel" id="phone" name="sdt" value={sdt} onChange={handleChangeInput} className="form-control" placeholder="Phone" />
                                <label htmlFor="inputPhone">Phone</label>
                            </div>
                            <div className="form-label-group">
                                <input type="date" id="birthday" name="ngaySinh" value={ngaySinh} onChange={handleChangeInput} className="form-control" placeholder="BirthDay" />
                                <label htmlFor="inputBirthday">BirthDay</label>
                            </div>
                            
                            <div className="form-label-group">
                                <div>
                                <label style={{float:'left'}}>Male
                                    <input type="radio" defaultChecked="defaultChecked" name="gioiTinh" value="true" onChange={handleChangeInput}/>
                                </label>              
                                <label style={{float:'right'}}>Female
                                    <input type="radio" name="gioiTinh" value="false" onChange={handleChangeInput}/>
                                </label>   
                                </div> 
                            </div>

                            <hr/>
                            <div className="form-label-group">
                                <input type="password" id="inputPassword" name="password" value={password} onChange={handleChangeInput} className="form-control" placeholder="Password" />
                                <label htmlFor="inputPassword">Password</label>
                            </div>
                            
                            <div className="form-label-group">
                                <input type="password" id="inputConfirmPassword" name="cf_password" value={cf_password} onChange={handleChangeInput} className="form-control" placeholder="Password" />
                                <label htmlFor="inputConfirmPassword">Confirm password</label>
                            </div>
                            

                            <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
                            <a className="d-block text-center mt-2 small" href="/signin">Sign In</a>
                            <hr className="my-4"/>
                            <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"> Sign up with Google</button>
                            <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"> Sign up with Facebook</button>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

    )
}
export default Register