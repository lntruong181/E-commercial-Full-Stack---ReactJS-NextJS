const mongoose = require('mongoose');

const productCategoriesSchema = mongoose.Schema({

    tenLoai: {
        type: String,
        default: "",
    },
    moTa: {
        type: String,
        default: "",
    }
}, {
    timestamps: true
})

let Dataset = mongoose.models.productCategories || mongoose.model('productCategories', productSchema);
export default Dataset
