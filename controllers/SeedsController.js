const seedsService = require('../services/SeedService');

class SeedsController {
    async get(request, response) {
        const {
            sort,
            season,
            size,
        } = request.query;
        const operation = await seedsService.getFilteredSeeds(
            sort,
            season,
            size,
        );
        if (operation.data) {
            response.status(500).json({
                message: operation.message,
            });
            return false;
        }
        response.status(200).json(operation);
    }
    async create(request, response) {
        const {
            seedName,
            price,
            sort,
            season,
            bigSeeds,
            weight,
            count,
            image,
        } = request.body;
        const serviceResponse = await seedsService.create(
            seedName,
            price,
            sort,
            season,
            bigSeeds,
            weight,
            count,
            image,
        );
        if (!serviceResponse.result) {
            response.status(500).json({
                message: serviceResponse.message,
                seed: serviceResponse.data,
            });
            return false;
        }
        response.status(200).json({
            message: serviceResponse.message,
            seed: serviceResponse.data,
        });
    }
    async delete(request, response) {
        const { id } = request.body;
        const operation = await seedsService.delete(id);
        if (!operation.result) {
            response.status(500).json();
            return false;
        }
        if (!operation.result) {
            response.status(500).json({
                message: operation.message,
            });
            return false;
        }
        response.status(200).json({
            message: operation.message,
        });
    }
    async update(request, response) {
        const {
            id,
            seedName,
            price,
            sort,
            season,
            bigSeeds,
            weight,
            count,
            image,
        } = request.body;
        const serviceResponse = await seedsService.update(
            id,
            seedName,
            price,
            sort,
            season,
            bigSeeds,
            weight,
            count,
            image,
        );
        if (!serviceResponse.result) {
            response.status(500).json({
                message: serviceResponse.message,
                seed: serviceResponse.data,
            });
            return false;
        }
        response.status(200).json({
            message: serviceResponse.message,
            seed: serviceResponse.data,
        });
    }
}

module.exports = new SeedsController();