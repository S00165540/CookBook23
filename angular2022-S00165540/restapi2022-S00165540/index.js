const express = require('express')
require('dotenv').config();
const cors = require('cors')
const passport = require('passport/lib');
const {User} = require('./models/users');


/**wgahatdfsnhrsktdj */

const recipes = require('./routes/recipes');
const home = require('./routes/home');
const db = require('./database');
const auth = require('./routes/auth');
const users = require('./routes/users');



const app = express()
const port = process.env.PORT 


passport.use(User.createStrategy());
app.use(passport.initialize());



const { default: mongoose } = require('mongoose');
const { Recipe } = require('./models/recipes');


app.use(express.static('./dist/recipe-app'));





var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use('/recipes', cors(corsOptions), recipes);

app.use('/', home);
app.use('recipes', recipes);

app.use('/users', users);
 app.use('/auth', auth)


app.listen(port, () => console.log(` app listening on ${port}!`))