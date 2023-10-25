const { FILTERED_SEASONS, SeedModel } = require('../models/Seed');

function filterSeason(season, sort) {
    return FILTERED_SEASONS[sort].includes(season) ? season : null;
}

class SeedService {
    async getFilteredSeeds(
        sort,
        season,
        size,
    ) {
        try {
            const sizesFilter = {
                $or: [
                    { $and: [{ big_seeds: true }, { count: { $exists: true, $ne: null, $in: [size] } }] }, // Якщо bigSeeds === true, взяти count
                    { $and: [{ big_seeds: false }, { weight: { $exists: true, $ne: null, $in: [size] } }] } // Якщо bigSeeds === false, взяти weight
                  ]
            };
            const filterData = {
                sort,
                season,
                ...sizesFilter,
            };
            const data = await SeedModel.find(filterData);
            return data;
        } catch(e) {
            return { message: 'Error', data: e, result: false };
        }
    }
    async create(
        name,
        price,
        sort,
        season,
        bigSeeds,
        weight = false,
        count = false,
        image,
    ) {
        const config = {};

        config.name = name;
        config.price = price;
        config.sort = sort;
        config.season = filterSeason(season, sort);
        config.big_seeds = bigSeeds;
        config.image = image ?? null;

        if (bigSeeds) {
            config.count = count;
            config.weight = null;
        } else {
            config.weight = weight;
            config.count = null;
        }

        try {
            const data = await SeedModel.create(config);
            return { message: 'Seed was created', data, result: true, };
        } catch(e) {
            return { message: 'Error', data: e, result: false };
        }
    }
    async delete(id) {
        try {
            const data = await SeedModel.deleteOne({ _id: id });
            return { message: 'Seed was removed', data, result: true, };
        } catch(e) {
            return { message: 'Error', data: e, result: false };
        }
    }
    async update(
        id,
        name,
        price,
        sort,
        season,
        bigSeeds,
        weight = false,
        count = false,
        image,
    ) {
        const config = {};

        config.name = name;
        config.price = price;
        config.sort = sort;
        config.season = filterSeason(season, sort);
        config.big_seeds = bigSeeds;
        config.image = image ?? null;

        if (bigSeeds) {
            config.count = count;
            config.weight = null;
        } else {
            config.weight = weight;
            config.count = null;
        }

        try {
            const data = await SeedModel.findOneAndUpdate({ _id: id }, config);
            return { message: 'Seed was updated', data, result: true, };
        } catch(e) {
            return { message: 'Error', data: e, result: false };
        }
    }

}

module.exports = new SeedService();