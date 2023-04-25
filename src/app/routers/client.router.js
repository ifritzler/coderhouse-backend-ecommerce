const {Router} = require('express');
const apiRouter = Router();

apiRouter.use('/', (req, res) => {
    res.render('index', {})
});

module.exports = apiRouter;
