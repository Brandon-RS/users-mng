import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  image: String,
  role: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

UserSchema.methods.toJSON = function () {
<<<<<<< HEAD
  const { __v, password, ...user } = this.toObject()
  return user
=======
  const { __v, password, _id, ...user } = this.toObject()
  user.uid = _id
  return { user }
>>>>>>> development
}

export default model('User', UserSchema)
