var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.use('/api/idCards',require('./api/idCards'));

app.listen(3005,()=>{
    console.log('服务器运行于3005端口...');
})