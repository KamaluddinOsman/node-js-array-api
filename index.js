const Joi               = require('Joi');
const express           = require('express');
const morgan            = require('morgan');
const config            = require('config');
const debug             = require('debug')('app:startup');

const customMiddleware  = require('./middleware/customMiddleware');
const items             = require('./routes/items');
const home              = require('./routes/home');

app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(customMiddleware);
app.use('/api/items', items);
app.use('/', home);

// Configration
debug("Application Name: " + config.get('name'));
debug("Mail Server: " + config.get('mail.host'));
// debug("Mail Password: " + config.get('mail.password'));

// Set morgan to works only in development environment
if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug(`NODE_ENV: ${app.get('env')}, and Morgan is enabled`);
}

const port = process.env.PORT | 3000;
app.listen(3000, () => console.log(`listening to port ${port}`));