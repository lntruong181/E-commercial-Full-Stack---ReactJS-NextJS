const mongoose = require('mongoose');
import moment from 'moment';

const userSchema = new mongoose.Schema({
    ten: {
        type: String,
        require: true,
    },
    sdt: {
        type: String,
        require: true,

    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        //unique chọn làm khóa chính trong db
        // unique: true,
        lowercase: true,
        validate: [(val) => {}, 'Please enter a valid email'],

    },
    gioiTinh: {
        type: Boolean,
        require: true,
    },
    anhDaiDien: {
        type: String,
        default: 'https://res.cloudinary.com/nguyenhungdev/image/upload/v1617853007/aothun_media/avatar_cugq40_xstasu.png',
    },
    ngaySinh: {
        type: Date,
        default: moment('1999-01-01').format('YYYY-MM-DD')
    },
    ngayTao: {
        type: Date,
        default: moment(Date.now()).format('YYYY-MM-DD')
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        require: true,
    },
    diaChi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address',
        require: true,
    }
}, {
    timestamps: true
})
let Dataset = mongoose.models.user || mongoose.model('user', userSchema);
export default Dataset
