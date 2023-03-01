// Connection with MongoDB cluster
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    // Place your MONGO_URI in .env file and accessing here
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    // Successful Connection
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    // Unsuccessful Connection
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

// Exporting ConnectDB function
module.exports =  connectDB
