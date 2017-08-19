const app = require('./express');
const b24 = require('b24');

const bitrix = new b24.Bitrix24({
  config: {
    mode: 'webhook',
    host: process.env.BITRIX24_HOST,
    user_id: process.env.BITRIX24_ID,
    code: process.env.BITRIX24_CODE
  }
})

module.exports = bitrix;

