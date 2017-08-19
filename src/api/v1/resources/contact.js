const bitrix = require('../../../config/bitrix');
const redis = require('../../../config/redis');

module.exports = {
    async list(req, res, next){
        try{
            const cache = await redis.getAsync('crm.contact.list');
            if(cache) return res.json(JSON.parse(cache));

            const result = await bitrix.callMethod('crm.contact.list');
            redis.setex('crm.contact.list', 3600, JSON.stringify(result));
            return res.json(result);
        }catch(err){
            next(err);
        }
    }
}