import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import morgan from 'morgan'
import { routes } from './routes'

import userRoutes from './routes/user'
import healthzRoutes from './routes/healthz'
import menuRoutes from './routes/menu'

const HOST = process.env.HOST || 'https://localhost'
const PORT = process.env.PORT || 8000
const LOGMSG = '⚡️[Paketá Credito Live-Coding BoilerPlate]:'

mongoose.connect(
    process.env.MONGO_URL || 'mongodb://localhost:27017/local',
    {},
    err => {
        const msg = err
            ? `${LOGMSG} Failed to connect to MongoDB: ${err}`
            : `${LOGMSG} MongoDB connection established successfully`
        console.log(msg)
    },
)

const app = express()

app.use(express.json())
app.use(morgan('tiny'))


app.use('/api/v1', routes);

// app.use('/user', userRoutes)
// app.use('/health', healthzRoutes)
// app.use('/menu', menuRoutes)

app.listen(PORT, () => {
    console.log(`${LOGMSG} Server is running at ${HOST}:${PORT}`)
})
