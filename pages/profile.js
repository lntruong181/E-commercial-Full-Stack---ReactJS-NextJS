import Head from 'next/head'
import { useState, useContext, setState, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import Link from 'next/link'
import valid from '../utils/valid'
import { getData } from '../utils/fetchData'
var dateFormat = require('dateformat');

const getUser = async (email) => {
   
    
    const res = await getData(`user/${email}`)
    if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
    return res.users
}

const Profile = () => {
    const [state, dispatch] = useContext(DataContext)
    const { auth } = state 

    const [dataUser, setDataUser] = useState({})
    
    useEffect(() => {
        if(auth.user){
            const getDataUser = async() => {
                const users = await getUser(auth.user.email)
                setDataUser(users)
           }
           getDataUser()
        }
     }, [auth.user]);
     const handleChangeInput = () => {

     }
    if(!auth.user) return null;
    
    
     
     return( 
        <div className="profile_page" style={{marginLeft:'10%', marginRight:'10%', marginTop: '30px'}}>
            <Head>
                <title>Profile</title>
            </Head>

            <section className="row text-secondary my-3">
                <div className="col-md-4">
                    <h3 className="text-center text-uppercase">
                        {auth.user.role === 'user' ? 'User Profile' : 'Admin Profile'}
                    </h3>

                    <div className="avatar">
                        <img src={auth.user.avata} alt={auth.user.avata} />
                        <span>
                            <i className="fas fa-camera"></i>
                            <p>Change</p>
                            <input type="file" name="file" id="file_up"
                            accept="image/*" />
                        </span>
                    </div>
                    <div className="form-label-group">
                                <input type="text" id="inputUserame" name="name" defaultValue={dataUser.ten}  onChange={handleChangeInput} className="form-control" placeholder="Username" />
                                <label htmlFor="inputUserame">Username</label>
                            </div>

                            <div className="form-label-group">
                                <input type="email" id="inputEmail" name="email" defaultValue={dataUser.email} onChange={handleChangeInput} className="form-control" placeholder="Email address" />
                                <label htmlFor="inputEmail">Email address</label>
                            </div>
                            
                            <hr/>
                            <div className="form-label-group">
                                <input type="tel" id="phone" name="sdt" defaultValue={dataUser.sdt} onChange={handleChangeInput} className="form-control" placeholder="Phone" />
                                <label htmlFor="inputPhone">Phone</label>
                            </div>
                            <div className="form-label-group">
                                
                                <input type="text" id="birthday" name="ngaySinh" defaultValue={dateFormat(dataUser.ngaySinh,"dd-mm-yyyy")} onChange={handleChangeInput} className="form-control" placeholder="BirthDay" />
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
                                <input type="password" id="inputPassword" name="password"  onChange={handleChangeInput} className="form-control" placeholder="Password" />
                                <label htmlFor="inputPassword">Password</label>
                            </div>
                            
                            <div className="form-label-group">
                                <input type="password" id="inputConfirmPassword" name="cf_password" onChange={handleChangeInput} className="form-control" placeholder="Password" />
                                <label htmlFor="inputConfirmPassword">Confirm password</label>
                            </div>
                            
                    <button className="btn btn-info">
                        Update
                    </button>
                </div>

                <div className="col-md-8">
                    <h3 className="text-uppercase">Orders</h3>

                    <div className="my-3 table-responsive">
                        <table className="table-bordered table-hover w-100 text-uppercase"
                        style={{minWidth: '600px', cursor: 'pointer'}}>
                            <thead className="bg-light font-weight-bold">
                                <tr>
                                    <td className="p-2">id</td>
                                    <td className="p-2">date</td>
                                    <td className="p-2">total</td>
                                    <td className="p-2">delivered</td>
                                    <td className="p-2">paid</td>
                                </tr>
                            </thead>

                            <tbody>
                               
                            </tbody>

                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Profile