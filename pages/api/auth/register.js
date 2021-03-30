import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import Accounts from '../../../models/accountModel'
import Addresss from '../../../models/addressModel'
import valid from '../../../utils/valid'
import bcrypt from 'bcrypt'


connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req, res) => {
    try{
      
        const {name , sdt, email, ngaySinh, gioiTinh, password, cf_password } = req.body
        const errMsg = valid(name , sdt, email, ngaySinh, gioiTinh, password, cf_password);
        if(errMsg) return res.status(400).json({err: errMsg})
        const user = await Users.findOne({ email })
        if(user) return res.status(400).json({err: 'This email already exists.'})

        const passwordHash = await bcrypt.hash(password, 12)
        
        // Tạo account cho user
        let account = {}
        account.password = passwordHash
        let userAccount = new Accounts(account)
        await userAccount.save();
        // Tạo Address mặc định cho user
        let userAddress = new Addresss();
        await userAddress.save();

        let userSignup = {};
        userSignup.ten = name;
        userSignup.sdt = sdt;
        userSignup.email = email;
        userSignup.ngaySinh = ngaySinh;
        userSignup.gioiTinh = gioiTinh;
        userSignup.account = userAccount.id;
        userSignup.diaChi = userAddress.id;
        const newUser = new Users(userSignup)
        await newUser.save()
        res.json({msg: "Register Success!"})

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}