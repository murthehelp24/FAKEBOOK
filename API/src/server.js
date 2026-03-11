import app from './app.js'
import 'dotenv/config'
import shutdownUtil from './utils/shutdown.util.js'

const PORT = process.env.PORT || 9000


app.listen(PORT, (req, res)=>{
  console.log(`Start Server : http://localhost:${PORT}`)
})

process.on('SIGINT', ()=> shutdownUtil('SIGINT')) // กด ctrl + c
process.on('SIGTERM', ()=> shutdownUtil('SIGTERM')) // kill command

// Catch unhandled errors
process.on("uncaughtException", ()=>  shutdown('uncaughtException'))
process.on("unhandledRejection", ()=> shutdown('unhandledRejection'))