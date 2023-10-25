const orderService = require('../services/OrdersService');

class OrdersController {
    async create(request, response) {
        try {
            const { products } = request.body;
            const result = await orderService.create(request.user._id, products);
            response.json(result);
        } catch(e) {
            response.status(500).json({ error: 'Order no created', data: e });
        }
    }
    async delete(request, response) {
        try {
            const { id } = request.body;
            const result = await orderService.delete(id);
            response.json(result);
        } catch(e) {
            response.status(500).json({ error: 'Order no deleted', data: e });
        }
    }
    async getForCustomer(request, response) {
        const result = await orderService.getForCustomer(request.user._id);
        response.json(result);
    }
    async get(request, response) {
        const result = await orderService.get();
        response.json(result);
    }
}

module.exports = new OrdersController();