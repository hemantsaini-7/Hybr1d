const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes  = require('./routes/userRoutes')
const buyerRoutes  = require('./routes/buyerRoutes')
const sellerRoutes  = require('./routes/sellerRoutes')

// For Accesing .env variables
dotenv.config();

//Connecting with our database
connectDB();

const app = express()

//Body Parser for POST requests
app.use(express.json())

//Routes
app.use('/api/auth/', userRoutes)
app.use('/api/buyer', buyerRoutes)
app.use('/api/seller/', sellerRoutes)

//Listen App on PORT
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));