const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({

    diaChi: {
        type: String,
        default: "",
    },
    phuongXa: {
        type: String,
        default: "",
    },
    quanHuyen: {
        type: String,
        default: "",
    },
    tinhThanhPho: {
        type: String,
        default: "",
    }
}, {
    timestamps: true
})

let Dataset = mongoose.models.address || mongoose.model('address', addressSchema);
export default Dataset
