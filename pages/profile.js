import Head from 'next/head'
import { useState, useContext, setState, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import Link from 'next/link'
import valid from '../utils/valid'
import { getData, patchData } from '../utils/fetchData'
var dateFormat = require('dateformat');

const getUser = async (email) => {
    const res = await getData(`user/${email}`)
    if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
    return res.users
}

const Profile = () => {
    const initialState = {avata: '', name: '', sdt: '', ngayTao: Date.now(), ngaySinh: Date.now() ,  gioiTinh: true, role: 'user',trangThai: true, password: '', cf_password: ''};
    const [data, setData] = useState(initialState)
    const {avata, name, sdt, gioiTinh, role, ngayTao, ngaySinh, trangThai, password, cf_password} = data


    const [state, dispatch] = useContext(DataContext)
    const { auth , notify} = state
      
    useEffect(() => {
        if(auth.user){
            const getDataUser = async() => {
                const res = await getUser(auth.user.email)
                const users = res.users
                const accounts = res.account
                setData({...data, name: users.ten, sdt: users.sdt, gioiTinh: users.gioiTinh, ngaySinh: users.ngaySinh, 
                    ngayTao: users.ngayTao, role: accounts.phanQuyen, trangThai: accounts.trangThai})
                
           }
           getDataUser()
           
        }
     }, [auth.user]);
     
    
     const handleChangeInput = (e) => {
        const {name, value} = e.target
        setData({...data, [name]: value})
        dispatch({type: 'NOTIFY', payload: {} })

     }
     const handleUpdateProfile = e => {
        e.preventDefault()
         if(password){
             const errMsg = valid(name , sdt, auth.user.email, ngaySinh, gioiTinh, password, cf_password) 
             if(errMsg) return dispatch({ type: 'NOTIFY', payload: {error: errMsg} })
             updatePassword()
         }

     }
     const updatePassword = () => {
        dispatch({ type: 'NOTIFY', payload: {loading: true} })
        patchData('user/resetPassword', {password}, auth.token)
        .then(res => {
            if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
            return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
        })
     }
    if(!auth.user) return null
    
     
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
                                <input type="text" id="inputUsername" name="name" value={name}  onChange={handleChangeInput} className="form-control" placeholder="Username" />
                                <label htmlFor="inputUserame">Username</label>
                            </div>

                            <div className="form-label-group">
                                <input type="email" id="inputEmail" name="email" readOnly defaultValue={auth.user.email} onChange={handleChangeInput} className="form-control" placeholder="Email address" />
                                <label htmlFor="inputEmail">Email address</label>
                            </div>
                            
                            <hr/>
                            <div className="form-label-group">
                                <input type="tel" id="phone" name="sdt" value={sdt} onChange={handleChangeInput} className="form-control" placeholder="Phone" />
                                <label htmlFor="inputPhone">Phone</label>
                            </div>
                            
                            <hr/>
                            <div className="form-label-group">
                                <div>
                                <label style={{float:'left'}}>Male
                                    <input type="radio" defaultChecked={gioiTinh? 'checked' : ''} name="gioiTinh" value="true" onChange={handleChangeInput}/>
                                </label>              
                                <label style={{float:'right'}}>Female
                                    <input type="radio" defaultChecked={gioiTinh? '' : 'checked'} name="gioiTinh" value="false" onChange={handleChangeInput}/>
                                </label>   
                                </div> 
                            </div>

                           <br/>
                           <hr/>
                           <div className="form-label-group">
                                
                                <input type="text" id="birthday" name="ngaySinh" value={dateFormat(ngaySinh,"dd-mm-yyyy")} readOnly onChange={handleChangeInput} className="form-control" placeholder="BirthDay" />
                                <label htmlFor="inputBirthday">BirthDay</label>
                            </div>
                           <div className="form-label-group">
                                <input type="text" id="inputDateCreateUser" value={dateFormat(ngayTao,"dd-mm-yyyy")} readOnly name="password"  onChange={handleChangeInput} className="form-control" placeholder="Day Create User" />
                                <label htmlFor="inputPassword">Day create user</label>
                            </div>
                            
                           <hr/>
                           <div className="form-label-group">
                                <input type="text" id="inputRole" name="role" value={role} readOnly={auth.user.role === 'user'? 'readOnly': ''} onChange={handleChangeInput} className="form-control" placeholder="Role" />
                                <label htmlFor="inputRole">Role</label>
                            </div>
                            
                            <div className="form-label-group">
                                <input type="text" id="inpuStatus" value={trangThai? 'Activated' : 'Un Activated'} readOnly={auth.user.role === 'user'? 'readOnly': ''} name="status" onChange={handleChangeInput} className="form-control" placeholder="Status" />
                                <label htmlFor="inpuStatus">Status</label>
                            </div>
                           <hr/>
                            
                            <div className="form-label-group">
                                <input type="password" id="inputPassword" name="password" value={password} onChange={handleChangeInput} className="form-control" placeholder="Password" />
                                <label htmlFor="inputPassword">New Password</label>
                            </div>
                            
                            <div className="form-label-group">
                                <input type="password" id="inputConfirmPassword" value={cf_password} name="cf_password" onChange={handleChangeInput} className="form-control" placeholder="Password" />
                                <label htmlFor="inputConfirmPassword">Confirm new password</label>
                            </div>
                          
                    <button className="btn btn-info" disabled={notify.loading} onClick={handleUpdateProfile}>
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