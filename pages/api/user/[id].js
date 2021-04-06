import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'

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
      const users = await Users.findOne(email)
      if(!users) return res.status(400).json({err: 'User không tồn tại'})
      res.json({users})
  }catch(err){
      return res.status(500).json({err: err.mesage})
  }
}