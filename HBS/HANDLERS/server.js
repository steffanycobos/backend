import express, { json, urlencoded } from 'express';
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import router from './index.js';


const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const app = express();

app.use(json());
app.use(urlencoded({extended: true}));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/', router);

app.listen('8080', ()=>{
    console.log('Server Listening PORT 8080')
})

app.on('error', (err)=>{
    console.log(err)
})
