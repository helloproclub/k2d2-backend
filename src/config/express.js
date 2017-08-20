const express = require('express');
const bodyParser = require('body-parser');
const expressValidation = require('express-validation');

const bitrix = require('./bitrix');
const v1 = require('../api/v1');

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");  
    // res.header("Access-Control-Allow-Credentials", "true");
    next();
});
  

//API Version 1
app.use('/api', v1)


// Bitrix auth
app.get('/auth', (req, res) => {
    res.redirect(bitrix.auth.authorizationUri);
});
  
// Callback service parsing the authorization token and asking for the access token
app.get('/callback', async (req, res) => {
    try{
        const code = req.query.code;
        const result = await bitrix.auth.getToken(code);
        return res.json(JSON.parse(result));
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Authentication Failed"});
    }
});

// Error handler
app.use((req, res, next) => {
  res.status(404).json({
      status: 404,
      message: "Resource not found"
  })
})

app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
        res.status(err.status).json({
            status: err.status,
            message: err.statusText,
            errors: err.errors
        });
    }else{
        if(err.status != undefined){
            res.status(err.status).json({
                status: err.status,
                message: err.message
            })
        }else{
            console.log(err);
            res.status(500).json({
                status: 500,
                message: "Internal server error"
            })
        }
    }
})

module.exports = app;