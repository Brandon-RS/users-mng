import { model, Schema } from 'mongoose'

const RoleSchema = new Schema({
  role: String
})

export default model('Role', RoleSchema)
