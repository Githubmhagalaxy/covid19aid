var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const {ApolloServer} = require('apollo-server-express');
const {typeDefs, resolvers} = require('./schema');
const {authMiddleware} = require('./utils/auth');

var app = express();

// initialize apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req, res}) => ({
        user: authMiddleware(req),
        req: req,
        res: res
    }),
    playground: true
});
server.applyMiddleware({app, cors: true});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = app;
