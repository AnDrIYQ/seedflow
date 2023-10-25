const { Schema, model } = require('mongoose');
const { SeedSchema } = require('./Seed');

const OrderSchema = new Schema({
    customer: { type: Schema.Types.ObjectId, rel: 'User', required: true },
    products: [
        { type: Schema.Types.ObjectId, rel: 'Seed' }
    ],
    totalPrice: {
        type: Number,
        required: true,
    }
});

module.exports = model('Order', OrderSchema);