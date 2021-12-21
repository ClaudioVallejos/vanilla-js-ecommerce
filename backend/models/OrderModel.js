import mongoose from "mongoose";

//constructor de la nueva orden. hace referencia a un schema de producto _id
const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            name: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            qty: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        },
    ],
    user: {
        type: mongoose.Schema.types.objectId,
        ref: 'User',
        required: true
    },
    shipping: {
        address: { type: String },
        city: { type: String },
        numberPhone: { type: Number },
    },
    payment: {
        paymentMethod: { type: String, required: true },
        paymentResult: {
            orderID: { type: String, required: true },
            payerID: { type: String, required: true },
            paymentID: { type: String, required: true },
        },
    },
    itemPrice: { type: Number }
}, {
    timestamps: true,
})