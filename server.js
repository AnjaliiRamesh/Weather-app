
require('dotenv').config();
const express = require('express');
const app = express();


app.get('/', (req,res)=>{
    res.send('Welcome to weather app backend!');
});


// 1. Import our custom weather router map
const weatherRoutes = require('./routes/weatherRoutes');

const PORT = process.env.PORT || 5000;

// 2. Plug the router map into our Express application
app.use('/api', weatherRoutes);


app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    console.log(`server is running on http://localhost:${PORT}`);
});