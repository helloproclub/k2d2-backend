const bitrix = require('../../../../config/bitrix');
const redis = require('../../../../config/redis');

module.exports = {
    async getWikidataFieldId(){
        let fieldList = await redis.getAsync('company.fields');
        if(!fieldList){
            fieldList = await bitrix.callMethod('crm.company.fields');
            redis.setex('company.fields', 300, JSON.stringify(fieldList));                
        }else{
            fieldList = JSON.parse(fieldList);
        }

        //Get wikidata field name
        for(let it in fieldList.result){
            if(fieldList.result.hasOwnProperty(it)){
                if (fieldList.result[it].listLabel == "wikidata") return it;
            }
        }
    }
}