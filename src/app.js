const express = require('express');
const ProductManager = require('./ProductManager.js');

const app = express();
const router = express.Router()

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT} 🚀`);
})
