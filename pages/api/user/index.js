import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import Accounts from '../../../models/accountModel'
import auth from '../../../middleware/auth'
import bcrypt from 'bcrypt'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "PATCH":
            await uploadInfor(req, res)
            break;
    }
}
const uploadInfor = async(req, res) => {
    try {
        const result = await auth(req,res)
        const {name, avata} = req.body
        
        const newUser = await Users.findByIdAndUpdate({_id: result.id},{ten: name, anhDaiDien: avata})
        const account = await Accounts.findById(newUser.account)

        res.json({
            msg: 'Update success!',
            user: {
                name,
                avata,
                email: newUser.email,
                role: account.phanQuyen
            }

        })
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
    
}

