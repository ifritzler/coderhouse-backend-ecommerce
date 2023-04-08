const express = require('express');
const apiRouter = require('./routes/apiRouter.js');

const app = express();

app.use('/api', apiRouter);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT} 🚀`);
})
