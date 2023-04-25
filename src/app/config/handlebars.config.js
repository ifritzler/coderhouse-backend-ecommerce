const {create} = require('express-handlebars');

const hbs = create({
    extname: 'html',
    encoding: 'utf-8'
});

const handlebarsConfiguration = (expressApp) => {
    expressApp.engine('html', hbs.engine);
    expressApp.set('view engine', 'html');
    expressApp.set('views', './views');
}

module.exports = handlebarsConfiguration;
