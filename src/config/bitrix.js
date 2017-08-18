const app = require('./express');
const Bitrix = require('../lib/bitrix');
const Token = require('../models/Token');

const bitrix = new Bitrix({
  config: {
    host: "k2d2",
    client_id : "local.599570dd479581.71292583",
    client_secret : "ORqgS5UImeUozO0MvTjOt1SCHE42TKC70hx5md2d0cK7Bm8vvl",
    redirect_uri : "http://localhost:3000/callback"
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

