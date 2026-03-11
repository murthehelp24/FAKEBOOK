import express from 'express'
import { postComment } from '../controllers/comment.controller.js'

const commentRoute = express.Router()

commentRoute.post('/', postComment)

export default commentRoute