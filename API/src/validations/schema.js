import { z } from 'zod'
import bcrypt from 'bcrypt'



const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[0-9]{10,15}$/

const identityKey = val => emailRegex.test(val) ? 'email' : 'mobile'


export const registerSchema = z.object({
  identity: z.string().min(2, "must have more than 2 character")
    .refine(val => emailRegex.test(val) || mobileRegex.test(val), "email or mobile phon require"),


  firstName: z.string().min(2, "first name is require"),
  lastName: z.string().min(2, "last name is require"),
  password: z.string().min(4, "password must more than 4 character"),
  confirmPassword: z.string().min(1, "confirm password is required")
}).refine(input => input.password === input.confirmPassword, {
  message: "password must match with confirmPassword",
  path: ['confirmPassword']
}).transform(async data => ({
  [identityKey(data.identity)]: data.identity,
  password: await bcrypt.hash(data.password, 5),
  firstName: data.firstName,
  lastName: data.lastName,
}))


export const loginSchema = z.object({
  identity: z.string().min(2, "Email or phone-number require")
    .refine(value => emailRegex.test(value) || mobileRegex.test(value), {
      message: "identity must be a valid email or mobile number"
    }),
  password: z.string().min(4, "password at least 4 characters")
}).transform(data => ({
  [identityKey(data.identity)]: data.identity,
  password: data.password
})
)
