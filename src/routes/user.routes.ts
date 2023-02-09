/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { check } from 'express-validator'

import { validateJWT } from '../middlewares/validate.jwt'
import { validateFields } from '../middlewares/validate.fields'
import { hasRole } from '../middlewares/validate.role'

import { emailExists, isValidRole, isRegisteredID } from '../helpers/db.validators'
import { userDelete, userGet, userPost, userPut } from '../controllers/user.controller'

const router = Router()

router.get('/', userGet)

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password need more than 6 characters').isLength({ min: 6 }),
  check('email', 'Email invalid').isEmail(),
  check('email').custom(emailExists),
  check('role').custom(isValidRole),
  validateFields
], userPost)

router.put('/:id', [
  check('id', 'Invalid ID').isMongoId(),
  check('id').custom(isRegisteredID),
  check('name', 'Name is required').optional().not().isEmpty(),
  check('role').optional().custom(isValidRole),
  check('password', 'Password need more than 6 characters').optional().isLength({ min: 6 }),
  check('email', 'Invalid email').optional().isEmail(),
  check('email').optional().custom(emailExists),
  validateFields
], userPut)

router.delete('/:id', [
  validateJWT,
  // isAdminRole,
  hasRole('ADMIN', 'SALES'),
  check('id', 'Invalid ID').isMongoId(),
  check('id').custom(isRegisteredID),
  validateFields
], userDelete)

export default router
