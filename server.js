import express from 'express'
import cors from 'cors'
import fs from 'fs'

//define __dirname since using ES modules does not do it automatically?
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/:character', (req, res) => {
    const character = req.params.character.toLowerCase()

    //serves a JSON file if the api endpoint matches one of the file names in /data
    //otherwise, returns an empty object
    if (fs.existsSync(`./data/${character}.json`)) {
        res.sendFile(__dirname + `/data/${character}.json`)
    }else{
        res.json({})
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`) 
})
