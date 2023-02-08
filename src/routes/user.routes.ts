import { Router } from 'express'
import { userDelete, userGet, userPost, userPut } from '../controllers/user.controller'

const router = Router()

router.get('/', userGet)
router.post('/', userPost)
router.put('/:id', userPut)
router.delete('/:id', userDelete)

export default router
