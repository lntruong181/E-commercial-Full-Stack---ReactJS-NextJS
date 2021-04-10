import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import Addresss from '../../../models/addressModel'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "PATCH":
            await updateAddress(req, res)
            break;
    }
}


const updateAddress = async (req, res) => {
    try {
        const result = await auth(req, res)
        const { diachi, phuongxa, quanhuyen, tinhtp } = req.body
    
        const users = await Users.findById({_id: result.id})
        const address = await Addresss.findOneAndUpdate({_id: users.diaChi}, {diaChi: diachi, phuongXa: phuongxa, quanHuyen: quanhuyen, tinhThanhPho: tinhtp})

        res.json({ msg: "Update Address Success!"})
        
    } catch (err) {
        return res.status(500).json({err: err.message})
    }   
}