const Order = require('../models/Order');
const { SeedModel } = require('../models/Seed');

class OrdersService {
    async create(userId, orderData) {
        const productIds = orderData.map(item => item.product);
        let totalPrice = 0;
        const products = await SeedModel.find({ _id: { $in: productIds } });
        orderData.map((item) => {
            const itemData = [...products].find((element) => element._id == item.product);
            totalPrice += item.quantity * itemData.price;
        });
        const created = await Order.create({
            customer: userId,
            products: productIds,
            totalPrice,
        });
        return created;
    }
    async delete(id) {
        return await Order.deleteOne({ _id: id });
    }
    async getForCustomer(customerId) {
        return await Order.find({ customer: String(customerId) });
    }
    async get() {
        return await Order.find({});
    }
}

module.exports = new OrdersService();