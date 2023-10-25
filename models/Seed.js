const { Schema, model } = require('mongoose');
const Order = require('../models/Order');

const ALL_SEASONS = [
    'early',
    'mid-early',
    'late',
    'mid-late',
    'mid-ripe',
];

const ALL_SORTS = [
    'carrot',
    'green',
    'zucchini',
    'cucumbers',
    'cabbage',
    'beet',
    'pepper',
    'pea',
    'radish',
    'tomatoes',
    'onion',
    'eggplant',
    'corn',
    'potato',
];

const FILTERED_SEASONS = {
    'carrot': ['early'],
    'green': ['early'],
    'zucchini': ['early'],
    'cucumbers': ['early'],
    'cabbage': ['early'],
    'beet': ['early'],
    'pepper': ['early'],
    'pea': ['early'],
    'radish': ['early'],
    'tomatoes': ['early'],
    'onion': ['early', 'late'],
    'eggplant': ['early'],
    'corn': ['early'],
    'potato': ['early'],
};

const SeedSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: false },
    sort: { type: String, required: true, enum: ALL_SORTS },
    season: { type: String, required: true, enum: ALL_SEASONS },
    big_seeds: { type: Boolean, required: false },
    weight: { type: Number, required: false },
    count: { type: Number, required: false },
});

SeedSchema.pre('deleteOne', async function (next) {
    try {
        const orders = await Order.deleteMany({ products: [this._conditions._id] });
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = {
    SeedSchema,
    SeedModel: model('Seed', SeedSchema),
    FILTERED_SEASONS,
};