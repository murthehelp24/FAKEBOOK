import createHttpError from 'http-errors'
import identityKeyCheck from '../utils/identity.util.js'
import { prisma } from '../lib/prisma.js'
import bcrypt from 'bcrypt'

export async function register(req, res, next) {
  const { identity, firstName, lastName, password, confirmPassword } = req.body
  // validation 
  if (!identity.trim() || !firstName.trim() || !lastName.trim() || !password.trim() || !confirmPassword.trim()) {
    return next(createHttpError[400]('fill all inputs'))
  }
  if (confirmPassword !== password) {
    return next(createHttpError[400]('check confirm-password'))
  }
  // check 
  const identityKey = identityKeyCheck(identity)
  if (!identityKey) {
    return next(createHttpError[400]('identity must be email or phone number'))
  }

  // find user for non-duplicate
  const foundUser = await prisma.user.findUnique({
    where: { [identityKey]: identity }
  })
  if (foundUser) {
    return next(createHttpError[409]('This user already register'))
  }

  // create new users
  const newUser = {
    [identityKey]: identity,
    password: await bcrypt.hash(password, 5),
    firstName,
    lastName
  }

  const createdUser = await prisma.user.create({
    data: newUser
  })

  console.log(createdUser)
  
  res.json({
    message : 'Register Success',
    user : createdUser
  })
}


export function login(req, res, next) {
  res.send('login controller')
}
export function getMe(req, res, next) {
  res.send('getMe controller')
}