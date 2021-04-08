import connectDB from '../../../utils/connectDB'
import Orders from '../../../models/orderModel'
import auth from '../../../middleware/auth'
import Products from '../../../models/productModel'
import Addresss from '../../../models/addressModel'
import Users from '../../../models/userModel'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case 'POST': 
            await createOrder(req, res)
            break;
    }
}

const createOrder = async (req, res) => {
    try {
        const result = await auth(req,res)
        const {name, email, sdt, diachi, phuongxa, quanhuyen, tinhtp, total, cart} = req.body

        const users = await Users.findById({_id: result.id})
        const address = await Addresss.findById(users.diaChi)
        if(diachi !== address.diaChi || phuongxa !== address.phuongXa || quanhuyen !== address.quanHuyen || tinhtp !== address.tinhThanhPho){
            await Addresss.findByIdAndUpdate({_id: users.diaChi},{diaChi: diachi, phuongXa: phuongxa, quanHuyen: quanhuyen, tinhThanhPho: tinhtp})
        }
        
        const newOrders = new Orders({
            user: result.id, address: address._id, mobile: sdt, cart , total

        })
        console.log(newOrders.cart)
        res.json({newOrders})
        
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}