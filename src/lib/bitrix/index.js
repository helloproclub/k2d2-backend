const request = require('request-promise');
const qs = require("querystring");
const auth = require("./auth");

/**
 * Bitrix24 Client Library
 */
class Bitrix{
    /**
     * Create Client
     * @param {string} param.config.host - Bitrix hostname, you can specify full hostname or just the name
     * @param {string} param.config.client_id - Your application client id
     * @param {string} param.config.client_secret - Your application client secret
     * @param {string} param.config.redirect_uri - Redirect URI for authentication
     * @param {Function} param.methods.saveToken - Method that trigger after successfully get the token. The first parameter is object containing token
     * @param {Function} param.methods.retriveToken -  Method to retrive token from storage, must return object with access_token and refresh_token key, or undefined
     */
    constructor (param){
        if(param.config.host.indexOf('.') == -1){
            param.config.host = `http://${param.config.host}.bitrix24.com`;
        }

        this.config = param.config;
        this.methods = param.methods;
        this.auth = new auth(param);
    }

    /**
     * Call Bitrix rest API
     * @param {string} method - Method that will be called
     * @param {Object} param - Parameter and field that will send to API
     */
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