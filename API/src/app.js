import express from 'express'
import authRoute from './routes/auth.routes.js'
import postRoute from './routes/post.routes.js'
import commentRoute from './routes/comment.routes.js'

const app = express()
app.use(express.json())


app.use('/api/auth', authRoute)


app.use('/api/post', postRoute)

app.use('/api/comment', commentRoute)

app.use('/api/like', (req, res) => {
  res.send('auth like')
})

export default app