const request = require('request-promise');
const qs = require("querystring");
const auth = require("./auth");

/**
 * Usage
 * const bitrix = new Bitrix({
 *      config:{
 *          host: "http://intenal.bitrix24.com",
 *          client_id: "your_client_id",
 *          client_secret: your_client_secret"",
 *          redirect_uri: "redirect_url"
 *      },
 *      methods: {
 *          saveToken: function(param),
 *          retriveToken: function()
 *      }
 *      
 * })
 */
class Bitrix{
    constructor (param){
        this.config = param.config;
        this.methods = param.methods;
        this.auth = new auth(param);
    }

    async callMethod(method, param = {}){
        //FIX ME: Always refresh token before request
        const token = await this.auth.refreshToken();
        param["auth"] = JSON.parse(token).access_token;
        const url = `${this.config.host}/rest/${method}?${qs.stringify(param)}`;
        console.log(url);
        const result = await request.get(url);
        return result;
    }
}
module.exports = Bitrix