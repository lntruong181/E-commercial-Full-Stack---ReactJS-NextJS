import Head from 'next/head'
import Link from 'next/link'

const Register = () => {
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
                        <form className="form-signin">
                            <div className="form-label-group">
                                <input type="text" id="inputUserame" className="form-control" placeholder="Username" required autoFocus/>
                                <label htmlFor="inputUserame">Username</label>
                            </div>

                            <div className="form-label-group">
                                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required/>
                                <label htmlFor="inputEmail">Email address</label>
                            </div>
                            
                            <hr/>
                            <div className="form-label-group">
                                <input type="date" id="" className="form-control" placeholder="BirthDay" required/>
                                <label htmlFor="inputConfirmPassword">BirthDay</label>
                            </div>
                            <div className="form-label-group">
                                <div>
                                <label style={{float:'left'}}>Male
                                    <input type="radio" defaultChecked="defaultChecked" name="gioiTinh" value="true"/>
                                </label>              
                                <label style={{float:'right'}}>Female
                                    <input type="radio" name="gioiTinh" value="false"/>
                                </label>   
                                </div> 
                            </div>

                            <hr/>
                            <div className="form-label-group">
                                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                                <label htmlFor="inputPassword">Password</label>
                            </div>
                            
                            <div className="form-label-group">
                                <input type="password" id="inputConfirmPassword" className="form-control" placeholder="Password" required/>
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