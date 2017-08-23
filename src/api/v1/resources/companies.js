const bitrix = require('../../../config/bitrix');
const redis = require('../../../config/redis');
const utils = require('./utils');

module.exports = {
    async list(req, res, next){
        try{
            const cache = await redis.getAsync('company.list');
            let result;
            if(cache) {
                result = JSON.parse(cache);
            }else{
                //Wikidata field
                const wikidataField = await utils.getWikidataFieldId();
                
                result = await bitrix.callMethod('crm.company.list', {
                    "SELECT[0]" : wikidataField,
                    "SELECT[1]" : "TITLE",
                    "SELECT[2]" : "COMPANY_TYPE",
                });

                result.result.forEach((it) => {
                    it.wikidata = it[wikidataField]
                });

                redis.setex('company.list', 300, JSON.stringify(result));
            }

            //Do filter
            if(req.query.q){
                result.result = result.result.filter((it)=>{
                    return it.TITLE.match(req.query.q) != null
                })
                result.total = result.result.length;
            }
            return res.json(result);
        }catch(err){
            next(err);
        }
    },
    async get(req, res, next){
        try{
            let id = req.params.id;
            const cache = await redis.getAsync('company.' + id);
            if(cache) return res.json(JSON.parse(cache));

            const wikidataField = await utils.getWikidataFieldId();            
            const result = await bitrix.callMethod('crm.company.get', {
                id: id
            });
    
            result.result.wikidata = result.result[wikidataField];
            
            redis.setex('company.' + id, 300, JSON.stringify(result));
            return res.json(result);
        }catch(err){
            next(err);
        }
    }
}