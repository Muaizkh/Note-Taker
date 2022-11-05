const express = require('express')
const app = express()
const PORT = 3001
const fs = require('fs')
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