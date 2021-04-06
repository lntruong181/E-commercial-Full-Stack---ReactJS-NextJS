import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import Accounts from '../../../models/accountModel'
import Addresss from '../../../models/addressModel'
import valid from '../../../utils/valid'
import bcrypt from 'bcrypt'
import {createAccessToken,createRefreshToken} from '../../../utils/generateToken'


connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await login(req, res)
            break;
    }
}

const login = async (req, res) => {
    try{
      
        const {email, password} = req.body
        
        const user = await Users.findOne({ email })
        if(!user) return res.status(400).json({err: 'This user does not exists.'})
        const account = await Accounts.findById(user.account)
        const address = await Addresss.findById(user.diaChi)
        const isMatch = await bcrypt.compare(password, account.password);
        if(!isMatch) return res.status(400).json({err: 'Incorrect password.'})

        const access_token = createAccessToken({id: user._id});
        const refresh_token = createRefreshToken({id: user._id});
        res.json({
            msg: "Login Success!",
            refresh_token,
            access_token,
            user:{
                name: user.ten,
                email: user.email,
                role: account.phanQuyen,
                avata: user.anhDaiDien,
                phone: user.sdt,
                address: address
                
            }
        })

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}