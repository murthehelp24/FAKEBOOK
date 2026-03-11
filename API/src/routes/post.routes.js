import express from 'express'
import { createPost, editPost, getAllPost, removePost } from '../controllers/post.controller.js'


const postRoute = express.Router()

postRoute.get('/', getAllPost)

postRoute.post('/', createPost)

postRoute.put('/:id', editPost)

postRoute.delete('/:id', removePost)


export default postRoute