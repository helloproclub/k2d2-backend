const bitrix = require('../../../config/bitrix');
const redis = require('../../../config/redis');

module.exports = {
    async list(req, res, next){
        try{
            const cache = await redis.getAsync('user.get');
            if(cache) return res.json(JSON.parse(cache));

            const result = await bitrix.callMethod('user.get');
            redis.setex('user.get', 3600, JSON.stringify(result));
            return res.json(result);
        }catch(err){
            next(err);
        }
    },
    async get(req, res, next){
        try{
            const id = req.params.id;
            const cache = await redis.getAsync('user.get.'+id);
            if(cache) return res.json(JSON.parse(cache));

            const result = await bitrix.callMethod('user.get', {"ID": id});
            redis.setex('user.get.'+id, 3600, JSON.stringify(result));
            return res.json(result);
        }catch(err){
            next(err);
        }   
    }
}