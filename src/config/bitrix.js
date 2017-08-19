const app = require('./express');
const {Bitrix24} = require('b24');
const Token = require('../models/Token');

const bitrix = new Bitrix24({
  config: {
    host: process.env.BITRIX24_HOST,
    client_id : process.env.CLIENT_ID,
    client_secret : process.env.CLIENT_SECRET,
    redirect_uri : process.env.REDIRECT_URI
  },
  methods: {
    async saveToken(param){
      try{
        await Token.remove()
        const token = new Token({
          accessToken: param.access_token,
          refreshToken: param.refresh_token
        })
        await token.save();
      }catch(err){
        console.log(err);
      }
    },
    async retriveToken(){
      try{
        const result = await Token.findOne();
        if(result) return {
          access_token: result.accessToken,
          refresh_token: result.refreshToken
        }

        return undefined;
      }catch(err){
        console.log(err);
      }
    }
  }
})

module.exports = bitrix;

