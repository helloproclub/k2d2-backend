const express = require('express');
const router = express.Router();
const redis = require('../../../config/redis');
const bitrix = require('../../../config/bitrix');

router.get('/try', async(req, res) => {
    try{
        const cache = await redis.getAsync('user.get');
        if(cache){
            return res.json(JSON.parse(cache));  
        }
        const result = await bitrix.callMethod('user.get');
        redis.setex('user.get', 3600, result);
        return res.json(JSON.parse(result))    
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Authentication Failed"}); 
    }
})

module.exports = router;