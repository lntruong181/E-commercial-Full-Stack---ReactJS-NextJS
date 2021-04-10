import jwt from 'jsonwebtoken'
import Users from '../models/userModel'
import Accounts from '../models/accountModel'


const auth = async (req, res) => {
    const token = req.headers.authorization;
    if(!token) return res.status(400).json({err: 'Invalid Authentication.'})

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if(!decoded) return res.status(400).json({err: 'Invalid Authentication.'})

    const user = await Users.findOne({_id: decoded.id})
    const account = await Accounts.findById(user.account)

    return {id: user._id, role: account.phanQuyen};
}


export default auth