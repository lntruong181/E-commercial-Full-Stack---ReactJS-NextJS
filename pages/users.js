import { useContext} from 'react'
import { DataContext } from '../store/GlobalState'

import Link from 'next/link'
import Head from 'next/head'
const users = () =>{
    const [state, dispatch] = useContext(DataContext)
    const { auth , notify, users} = state



    return (
        <div  className="container my-3" style={{minWidth : "1500px"}}>
            <Head>
                <title>
                    User manager
                </title>
            </Head>


        <table className="table-bordered table-hover w-100 text-uppercase"
        >
            <thead className="bg-dark font-weight-bold">
                <tr>
                    
                    <td className="p-2">id</td>
                    <td className="p-2">Avatar</td>
                    <td className="p-2">Name</td>
                    <td className="p-2">Phone</td>
                    <td className="p-2">Email</td>
                    <td className="p-2">created date</td>
                    <td className="p-2">Role</td>
                    <td className="p-2">Action</td>
                </tr>
            </thead>

            <tbody>
                {
                    users.map(user => (
                        <tr >
                            <td className="p-2">
                               
                                    <a>{user._id}</a>
                              
                                
                            </td>
                            <td className="p-2">
                               <img src={user.anhDaiDien} style={{maxWidth : '30px', maxHeight : '30px'}}></img>
                            </td>
                            <td className="p-2">{user.ten}</td>
                            <td className="p-2">
                            {user.sdt}
                            </td>
                            <td className="p-2">
                            {user.email}
                            </td>
                            <td className="p-2">
                            {user.ngayTao}
                            </td>
                            <td className="p-2 text-danger">
                                {
                                    user.account.phanQuyen === 'admin'
                                    ? <i className="fas fa-check text-success">Admin</i>
                                    : <i className="fas fa-times text-danger"></i>
                                }
                            </td>
                            <td className="p-2">
                                <Link href={`editUser/${user._id}`}>
                                <a> <i className='fas fa-edit text-info mr-2' style={{fontSize: '18px'}} title='Sua'></i></a>
                                </Link>
                                <i className="far fa-trash-alt text-danger" aria-hidden="true" 
                                style={{fontSize: '18px'}} data-toggle="modal" data-target="#exampleModal"
                                onClick={() => dispatch({
                                    type: 'ADD_MODAL',
                                    payload: { data: users, id: user._id, title: user.email }
                                })} ></i>
                            </td>
                          
                        </tr> 
                    ))
                }
            </tbody>
          
        </table>
    </div>
    )
}
export default users