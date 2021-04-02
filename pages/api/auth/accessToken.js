import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import Accounts from '../../../models/accountModel'
import Addresss from '../../../models/addressModel'
import {createAccessToken} from '../../../utils/generateToken'
import jwt from 'jsonwebtoken'

connectDB()

export default async (req, res) => {
    try {
        const rf_token = req.cookies.refreshtoken;
        if(!rf_token) return res.status(400).json({error: 'Please login now'})

        const result  = jwt .verify(rf_token, process.env.REFRESH_TOKEN_SECRET)
        if(!result) return res.status(400).json({error: 'You token is incorrect or has exprired'});

        const user = await Users.findById(result.id)
        const account = await Accounts.findById(user.account)
        if(!user) return res.status(400).json({error: 'User does not exist.'})

        const access_token = createAccessToken({id: user._id})
        res.json({
            access_token,
            user:{
                name: user.ten,
                email: user.email,
                role: account.phanQuyen,
                avata: user.anhDaiDien
            }
        })

    }catch(err){
        return res.status(400).json({err: err.message });
    }
}