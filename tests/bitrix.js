const Bitrix = require('../src/lib/bitrix');
const Token = require('../src/models/Token');

function generateBitrix(hookResult){
    const bitrix = new Bitrix({
      config: {
        host: process.env.TEST_BITRIX_HOST || "test",
        client_id : process.env.TEST_BITRIX_CLIENT_ID || "test_client",
        client_secret : process.env.TEST_BITRIX_CLIENT_SECRET || "test_secret",
        redirect_uri : "http://localhost:3000/callback"
      },
      methods: {
        async saveToken(param){
          try{
            hookResult.saveTokenCalled = true;

          }catch(err){
            console.log(err);
          }
        },
        async retriveToken(){
          try{
            hookResult.retriveTokenCalled = true;    
            return {
                access_token: process.env.TEST_BITRIX_ACCESS_TOKEN || "test_access_token",
                refresh_token: process.env.TEST_BITRIX_REFRESH_TOKEN || "test_refresh_token"
            }        
          }catch(err){
            console.log(err);
          }
        }
      }
    });
    
    return bitrix;
}

module.exports = {
    generateBitrix: generateBitrix
}

