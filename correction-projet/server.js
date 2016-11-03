var express  = require('express'),
    mongoose = require('mongoose'),
    jwt      = require('jsonwebtoken'),
    login    = require('./routes/login'),
    users    = require('./routes/api/user'),
    posts    = require('./routes/api/post'),
    app      = express();


mongoose.connect('mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':' + process.env.MONGO_PORT_27017_TCP_PORT +'/myBlog');

app
    .use(express.static('./public'))
    .use('/', login)
    .use('/api', users)
    .use('/api', posts)
    .listen(3000);
