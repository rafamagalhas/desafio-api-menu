import { logger } from './utils/winston';
import app from './app';
import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

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
        logger.info(msg)
    },
)

app.listen(PORT, () => {
    logger.info(`${LOGMSG} Server is running at ${HOST}:${PORT}`)
})
