import express from 'express'
import { createYoga } from 'graphql-yoga'
import { schema } from './schema.js'
import { config } from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from 'mongoose'
import {auth} from "./graphql/middleware/auth.js"

const app = express()

config()

app.use(cors())
app.use(cookieParser());


let mongodb = {}

const dbusername = process.env.MONGOUSERNAME
const dbpassword = process.env.MONGOPASSWORD
const dbconnected = process.env.MONGOUSERNAME ?"MONGO":"LOCAL"
const dbaddress = process.env.DBADDRESS

const mongocluster = 'mongodb+srv://'+dbusername+':'+dbpassword+'@'+dbaddress+'?retryWrites=true&w=majority'
let mongourl = 'mongodb://127.0.0.1/date-db';

mongourl = (dbconnected == "MONGO")?mongocluster:mongourl
mongoose.set('strictQuery', true)
mongoose.connect(mongourl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(connect => console.log('connected to '+dbconnected+' mongodb..'))
.catch(e => console.log('could not connect to mongodb', e));



app.use("/graphql", (req,res)=>{
    createYoga({
      schema,
      context: {
        mongodb, req, res, auth,  
      }
    })(req,res)
})

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile('index.html', {root: 'public'});
});
  

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
 console.log(`Server is running on http://localhost:${PORT}/graphql`)
})

