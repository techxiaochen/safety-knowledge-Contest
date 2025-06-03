const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// 中间件
app.use(bodyParser.json());
app.use(cors());

// 路由
app.use('/api/teams', require('./src/routes/teams'));
app.use('/api/questions', require('./src/routes/questions'));

module.exports = app;