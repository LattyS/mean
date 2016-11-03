var faker    = require('faker'),
    mongoose = require('mongoose'),
    crypto   = require('crypto'),
    User     = require('./models/user'),
    Post     = require('./models/post'),
    user,
    users  = [];

mongoose.connect('mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':' + process.env.MONGO_PORT_27017_TCP_PORT +'/myBlog');

faker.locale = "fr";

var maxUsers = 5;

for (var i=0; i < maxUsers; i+=1) {
    (function(j){
        user = new User({
            username: faker.internet.userName(),
    //        password: faker.internet.password(),
            password: 'admin',
            salt: faker.random.alphaNumeric(),
            profileImageURL: faker.internet.avatar(),
            updated: faker.date.recent(),
            created: faker.date.past()
        }).save(function(err, user){
            users.push(user);
            var maxPosts = faker.random.number(5);
            for (var x=0; x < maxPosts; x+=1) {
              (function(y){
                var comments=[];
                var end = faker.random.number(5);
                for (var k=0; k<end; k+=1) {
                    comments.push({
                        user: users[faker.random.number(users.length - 1)],
                        comment: faker.lorem.sentence()
                    });
                }
                new Post({
                    title: faker.lorem.words(),
                    content: faker.lorem.paragraphs(),
                    comments: comments,
                    imageURL: faker.image.image(),
                    user: users[faker.random.number(3)],
                    created: faker.date.past()
                }).save(function(err, data) {
                  console.log(data);
                  if ((j == maxUsers - 1) && (y == maxPosts - 1)) {
                    mongoose.connection.close();
                  }
                });
              })(x);
            }
        });
    })(i);
}
