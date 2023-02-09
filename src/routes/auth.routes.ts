/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { check } from 'express-validator'
import { login } from '../controllers/auth.controller'
import { validateFields } from '../middlewares/validate.fields'

const router = Router()

router.post('/login', [
  check('email', 'Email required').not().isEmpty(),
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password required').not().isEmpty(),
  validateFields
], login)

export default router
