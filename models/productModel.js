const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    tenSanPham: {
        type: String,
        default: "",
    },
    loaiSanPham: {
         type: mongoose.Schema.Types.ObjectId,
        ref: 'productCategories',
        require: true,
    },
    giaTien: {
        type: Number,
        default: "",
    },
    soLuongTonKho: {
        type: Number,
        default: "",
    },
    trangThai: {
        type: Boolean,
        default: "",
    },
    size: {
        type: String,
        default: "",
    },
    hinhAnh: {
        type: String,
        default: 'https://res.cloudinary.com/https-next-js-with-mongo-db-vercel-app/image/upload/v1616749790/avatar_cugq40_pwkti8.png',
    },
    moTa: {
        type: String,
        default: "",
    }
}, {
    timestamps: true
})

let Dataset = mongoose.models.product || mongoose.model('product', productSchema);
export default Dataset
