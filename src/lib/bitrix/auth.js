const request = require('request-promise');
const qs = require('querystring');

/**
 * Bitrix24 Authentication
 */
class BitrixAuth{
    /**
     * Create Authenticator
     * @param {object} param - param passed from main Bitrix class
     */
    constructor(param){
        this.param = param;
        this.authorizationUri = this.param.config.host + "/oauth/authorize?" + qs.stringify({
            client_id: this.param.config.client_id,
            response_type: "code",
            redirect_uri: this.param.config.redirect_uri
        })
    }


    /**
     * Get token from Bitrix
     * @param {string} code - Code for get the token
     * @return {Promise} Token as JSON String
     */
    async getToken(code){
        if(!code) throw Error("Please provide code");
        const result = await request.get(this.param.config.host + "/oauth/token/?" + qs.stringify({
            client_id: this.param.config.client_id,
            grant_type: "authorization_code",
            client_secret: this.param.config.client_secret,
            redirect_uri: this.param.config.redirect_uri,
            code: code
        }));
        if(this.param.methods.saveToken){
            await this.param.methods.saveToken(JSON.parse(result));        
        }
        return result;
    }

    /**
     * Get new token
     * @param {string} token - Refresh token
     * @return {Promise} Token as JSON String
     */
    async refreshToken(token){
        if((!token) && (this.param.methods.retriveToken)){
            token = await this.param.methods.retriveToken();
            token = token.refresh_token;
        }else if(!token){
            throw Error("Please provide token");
        }

        const url = this.param.config.host + "/oauth/token/?" + qs.stringify({
            client_id: this.param.config.client_id,
            grant_type: "refresh_token",
            client_secret: this.param.config.client_secret,
            redirect_uri: this.param.config.redirect_uri,
            refresh_token: token
        });
        console.log(url);
        const result = await request.get(url);

        if(this.param.methods.saveToken){
            await this.param.methods.saveToken(JSON.parse(result));        
        }

        return result;
    }

}

module.exports = BitrixAuth