# k2d2 Backend

![Travis](https://travis-ci.org/helloproclub/k2d2-backend.svg?branch=master)

Requirement:

- Node >= 7.6.0
- Redis

Tested On:

- Ubuntu 16.04
- MacOS Sierra
- Node 7.6.0
- Redis 4.0.1

# Setup

1. Create `.env` file, sample can found in `.env.example`

  > copy .env.example .env

  ```
  BITRIX24_HOST=YourBitrixHost
  BITRIX24_CODE=YourBitrixCode
  BITRIX24_ID=YourBitrixId
  ```

  > BITRIX24_HOST => The subdomain of your bitrix. For <https://k2d2.bitrix24.com>, the value would be BITRIX24_HOST=k2d2

  > BITRIX24_CODE => Your api key. To get the code, go to <https://besutkode.bitrix24.com/marketplace/hook/ap/0/> and check all access permission. After you click save, you'll get the code. The value will looks like BITRIX24_CODE=0lzo7kh9597hm9t6

  > BITRIX24_ID => Your user id. To get the user id, go to my profile, see the URL, e.g <https://k2d2.bitrix24.com/company/personal/user/4/>. The value would be BITRIX24_ID=4

  From the example above. Complete .env file would be:

  ```
  ENV=development
  PORT=3000
  REDIS_HOST=127.0.0.1
  REDIS_PORT=6379

  # BITRIX24 CONFIGURATION
  BITRIX24_HOST=k2d2
  BITRIX24_CODE=0lzo7kh9597hm9t6
  BITRIX24_ID=4
  ```

2. run `npm install`

3. run `npm run dev`

4. Authenticate bitrix24 by accessing `hostname:port/auth`

5. Profit!!

# TODO

- [ ] Unit Test
- [ ] More API Endpoint
- [ ] API Documentation
