const bitrix = require('../../../config/bitrix');
const redis = require('../../../config/redis');

module.exports = {
    async list(req, res, next){
        try{
            const cache = await redis.getAsync('doctor.list');
            if(cache) return res.json(JSON.parse(cache));

            const result = await bitrix.callMethod('crm.contact.list', {
                "filter[TYPE_ID]": "PARTNER"
            });
            redis.setex('doctor.list', 300, JSON.stringify(result));
            return res.json(result);
        }catch(err){
            next(err);
        }
    },
    async get(req, res, next){
        try{
            let id = req.params.id;
            const cache = await redis.getAsync('doctor.' + id);
            if(cache) return res.json(JSON.parse(cache));

            const result = await bitrix.callMethod('crm.contact.get', {
                id: id
            });
            redis.setex('doctor.' + id, 300, JSON.stringify(result));
            return res.json(result);
        }catch(err){
            next(err);
        }
    }
}