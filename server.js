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

app.set('view engine', 'ejs')

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
    //getFiles()
    res.render('index.ejs')
})

app.get('/api', (req, res) => {
    res.render('api.ejs')
})

app.get('/api/:character', (req, res) => {
    const character = req.params.character.toLowerCase()

    //serves a JSON file if the api endpoint matches one of the file names in /data
    //otherwise, returns an empty object
    if (fs.existsSync(`./data/${character}.json`)) {
        res.sendFile(__dirname + `/data/${character}.json`)
    }else{
        res.statusMessage =  'Invalid Endpoint'
        res.status(400).end()
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`) 
})

async function getFiles() {
    const files = await fs.promises.readdir(__dirname + '/data')

    let character = ''

    fs.readFile(`${__dirname}/data/${files[0]}`, 'utf8', (err, data) =>  {
        if (err) throw err
        console.log(data)
        character = data
        character = JSON.stringify(character)
    })

    console.log(character)

}
