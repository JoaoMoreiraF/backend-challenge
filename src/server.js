import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import userRoute from './routes/userRoute';
import itemRoute from './routes/itemRoute';

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use(bodyParser.json({limit: "50mb"}))

app.use('/static',express.static('public'))
app.use('/api/v1', userRoute)
app.use('/api/v1/item', itemRoute)

app.listen(9000, () => {
    console.log('server listening in port 9000')
})
