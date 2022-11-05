const express = require('express');
const noteRoute = express.Router();
const fs = require ('fs');

// route to be able to access notes from data that is saved

noteRoute.get('/db', (req,res) => 
fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if(err) {
        console.error(err)
    }else {
        const parsedNotes = JSON.parse(data)
        res.json(parsedNotes)
    }
}));

noteRoute.get('/notes', (req, res) => {

    fs.readFile('./db/db.json', 'utf8', (err, data) => {

        if(err) {
            console.error(err)
        }else {
            const parsedNotes = JSON.parse(data)
            res.json(parsedNotes)
        }
    })
});

noteRoute.post('/notes', (req,res) => {

    res.json(`${req.method} posted successfully!`)

    const { title, text } =req.body
    console.log(title, text)

    if (title && text) {
        const newNote = {
            title,
            text,
        }
    }
    const notes = []
    notes.push(newNote)

    fs.readFile('db/db.json', 'utf8', (err, data) => {

        if(err) {
            console.error(err)
        }else {

            const parsedNotes = JSON.parse(data)
            parsedNotes.push(newNote)

            fs.writeFile (

                'db/db.json',
                JSON.stringify(parsedNotes, null, 4),
                writingErr => 
                writingErr
                ? console.err(writingErr)
                : console.info('Note saved successfully')
            )
        }
    })
});

module.exports = noteRoute;