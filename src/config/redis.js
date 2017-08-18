const bluebird = require('bluebird');
const redis = require("redis");
const config = require('./env')
const client = redis.createClient({
    host: config.redis_host,
    port: config.redis_port
});


bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = client;