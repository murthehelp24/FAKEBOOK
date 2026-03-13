import "dotenv/config"
import createHttpError from 'http-errors'
import { prisma } from '../lib/prisma.js'
import bcrypt from 'bcrypt'
import { loginSchema, registerSchema } from '../validations/schema.js'
import jwt from 'jsonwebtoken'
import { createUser, getUserBy } from "../services/user.service.js"


export async function register(req, res, next) {
  // validation 
  const data = await registerSchema.parseAsync(req.body)

  // check identity is email or mobile
  const identityKey = data.email ? 'email' : 'mobile'

  // find user for non-duplicate
  const foundUser = await getUserBy(identityKey, data[identityKey])
  if (foundUser) {
    return next(createHttpError[409]('This user already register'))
  }

  // create new users

  const createdUser = await createUser(data)

  const userInfo = {
    id: createdUser.id,
    [identityKey]: data.identity,
    firstName: createdUser.firstName,
    lastName: createdUser.lastName
  }

  // console.log(createdUser)
  res.json({
    message: 'Register Success',
    user: userInfo
  })
}


export async function login(req, res, next) {
  const data = loginSchema.parse(req.body)
  const identityKey = data.email ? 'email' : 'mobile'
  // find User
  const foundUser = await prisma.user.findFirst({
    where: { [identityKey]: data[identityKey] }
  })
  if (!foundUser) {
    return next(createHttpError[401]('Invalid Login 1'))
  }
  // check Password
  const checkPassword = await bcrypt.compare(data.password, foundUser.password)
  if (!checkPassword) {
    return next(createHttpError[401]('Invalid login 2'))
  }

  // create token
  const payload = { id: foundUser.id }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "7d"
  })
  // 
  const { password, createdAt, updatedAt, ...userInfo } = foundUser

  res.json({
    message: "login done",
    token: token,
    user: userInfo
  })
}

export function getMe(req, res, next) {
  res.json({ user: req.user })
}