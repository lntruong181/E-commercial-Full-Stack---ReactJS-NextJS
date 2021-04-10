import Head from 'next/head'
import {userContext,useState,useEffect, useContext} from 'react'
import {DataContext, dataContext} from '../../store/GlobalState'
import {useRouter} from 'next/router'
import { STATES } from 'mongoose'
import { route } from 'next/dist/next-server/server/router'

const editUser = () =>{
    const router = useRouter()
    const {id} = router.query

    const [state ,dispatch] =useContext(DataContext)
    const {auth,users} = state

    const [ editUser, setEditUser] = useState([])
    useEffect(() =>{
       users.forEach(user => {
           if(user._id === id)
           setEditUser(user)
       });     
    })

    return (
        <div className="container">
            <Head>
                <title>
                    Edit User
                </title>
            </Head>
        <form>
            <div >
                <button className="btn btn-dark my-3" onClick={()=>router.back()}>
                    <i className="fas fa-long-arrow-alt-left"></i> Go back
                </button>
            </div>
        <div class="form-group">
           <label for="exampleInputEmail1">Địa chỉ email</label>
           <input type="email" class="form-control" id="exampleInputEmail1" defaultValue={editUser.email} placeholder="Email"/>

        </div>
        <div class="form-group">
           <label for="exampleInputEmail1">Tên</label>
           <input type="text" class="form-control" id="" defaultValue={editUser.ten} placeholder="Nguyễn Văn A"/>
        </div>
        <div class="form-group">
           <label for="exampleInputEmail1">Số điện thoại</label>
           <input type="phone" class="form-control" id="" defaultValue={editUser.sdt} placeholder="0903930xxx"/>
        </div>
        <div class="form-group">
           <label for="exampleInputEmail1">Giới Tính</label>
           <input type="email" class="form-control" id="" defaultValue={editUser.gioiTinh} placeholder="Họ và tên"/>
        </div>
        <div class="form-group">
           <label for="exampleInputEmail1">Địa chỉ</label>
           <input type="email" class="form-control" id="" defaultValue={editUser.diaChi} placeholder="102/23/1"/>
        </div>
        <div class="form-group">
           <label for="exampleInputEmail1">Ngày tạo</label>
           <input disabled type="email" class="form-control" id="exampleInputEmail1" defaultValue={editUser.ngayTao} placeholder="Họ và tên"/>
        </div>



        <div class="form-check">
           <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
           <label class="form-check-label" for="exampleCheck1"
           ></label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
     </form>
     </div>
    )

}

export default editUser