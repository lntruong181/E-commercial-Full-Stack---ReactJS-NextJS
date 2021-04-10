import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import Accounts from '../../../models/accountModel'
import auth from '../../../middleware/auth'



connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getAllUsers(req, res)
            break;
        case "PATCH":
            await uploadInfor(req, res)
            break;
    }
}

const getAllUsers = async(req, res) => {
    try {
        const result = await auth(req,res)
        if(result.role !== 'admin') return res.status(400).json({err: 'authenttication'})

        const users = await Users.find().populate("account", "-password")

        res.json({users})
    } catch (error) {
        return res.status(500).json({err: error.message})
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

