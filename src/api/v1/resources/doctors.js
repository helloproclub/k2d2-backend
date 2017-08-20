const bitrix = require('../../../config/bitrix');
const redis = require('../../../config/redis');
const utils = require('./utils');

module.exports = {
    async list(req, res, next){
        try{
            const cache = await redis.getAsync('doctor.list');
            if(cache) return res.json(JSON.parse(cache));

            let result = await bitrix.callMethod('crm.contact.list', {
                "filter[TYPE_ID]": "PARTNER"
            });

            //Wikidata field
            const wikidataField = await utils.getWikidataFieldId();
        
            //Get Company
            let company = await redis.getAsync('company.list');
            if(!company){
                company = await bitrix.callMethod('crm.company.list', {
                    "SELECT[0]" : wikidataField,
                    "SELECT[1]" : "TITLE"
                });
                redis.setex('company.list', 300, JSON.stringify(company));
            }else{
                company = JSON.parse(company);
            }

            let companyObj = {};
            company.result.forEach((it) => {
                companyObj[it.ID] = it;
                companyObj[it.ID].wikidata = it[wikidataField];
            })

            result.result.forEach((it) => {
                it.COMPANY = companyObj[it.COMPANY_ID];
            })
 
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
    
            const wikidataField = await utils.getWikidataFieldId();
            const company = await bitrix.callMethod('crm.company.get', {ID: result.result.COMPANY_ID});
            company.result.wikidata = company.result[wikidataField];
            result.result.COMPANY = company.result;
            
            redis.setex('doctor.' + id, 300, JSON.stringify(result));
            return res.json(result);
        }catch(err){
            next(err);
        }
    }
}