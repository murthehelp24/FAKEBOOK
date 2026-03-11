import express from 'express'
import authRoute from './routes/auth.routes.js'
import postRoute from './routes/post.routes.js'
import commentRoute from './routes/comment.routes.js'
import notFoundMiddleware from './middlewares/notFound.middleware.js'
import errorMiddleware from './middlewares/error.middleware.js'

const app = express()
app.use(express.json())


app.use('/api/auth', authRoute)


app.use('/api/post', postRoute)

app.use('/api/comment', commentRoute)


// ยังไม่ได้เขียน router, controller
app.use('/api/like', (req, res) => {
  res.send('auth like')
})
// not found
app.use(notFoundMiddleware)
// error middleware
app.use(errorMiddleware)

export default app