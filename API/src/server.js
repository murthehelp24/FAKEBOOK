import app from './app.js'
import 'dotenv/config'

const PORT = process.env.PORT || 9000


app.listen(PORT, (req, res)=>{
  console.log(`Start Server : http://localhost:${PORT}`)
})