require('dotenv').config()

const express = require('express');
const cors = require('cors');
const session = require('express-session')

const { errorHandler } = require('./src/middleware/errorHandler')
const api_route = require('./src/routes/route');
const passport = require('./src/config/passport.config');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({
    extended : true,
}));
app.use(cors({origin : '*'}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {maxAge: 1000 * 60 * 60 * 1} // 1 hour
}))

// setting passportjs
app.use(passport.initialize())
app.use(passport.session())

// test routing
app.use('/ping', (req, res, next) => {
    res.status(200).send({'message' : 'pong'});
})

// api handler
app.use('/api', api_route);

// error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
})