import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import Accounts from '../../../models/accountModel'
import Addresss from '../../../models/addressModel'

connectDB()

export default async (req,res) => {
    switch(req.method){
      case 'GET':
        await getUser(req,res)
        break;
    }
}
const getUser = async (req,res) => {
  try{
      const {email} = req.query;
      const users = await Users.findOne({email: email})      
      const account = await Accounts.findById(users.account)
      const address = await Addresss.findById(users.diaChi)
      if(!users) return res.status(400).json({err: 'User không tồn tại'})
      res.json({users:{users,account, address}})
  }catch(err){
      return res.status(500).json({err: err.mesage})
  }
}