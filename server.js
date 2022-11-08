const express = require('express')
const app = express()
const PORT = 3001
const fs = require('fs')

// adding connection to MongoDB and Heroku (for future reference)
// mongoose.connect(
//     process.env.MONGODB_URI || 'mongodb://localhost:27017/MYSQL',
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//   );
// need to add routes to be able to connect them to the server.js
const htmlRoute = require('./routes/htmlRoute')
const noteRoutes = require ('./routes/noteRoute')

app.use(express.static('public'))

app.use(express.json ())
app.use(express.urlencoded({ extended: true}))

// must add routes again
app.use('/api', noteRoutes)
app.use('/api', htmlRoute)

app.listen(process.env.PORT || PORT, () => {
    console.log('working')
});