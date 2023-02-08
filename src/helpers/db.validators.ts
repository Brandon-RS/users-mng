import User from '../models/user'
import Role from '../models/role'

export const isValidRole = async (role: string): Promise<void> => {
  const existRole = await Role.findOne({ role })
  if (existRole === null) {
    throw new Error(`Role ${role} is not registered`)
  }
}

export const emailExists = async (email: string): Promise<void> => {
  const userEmail = await User.findOne({ email })
  if (userEmail !== null) {
    throw new Error('Email already registered')
  }
}

export const isRegisteredID = async (id: any): Promise<void> => {
  const user = await User.findById(id)
  if (user === null) {
    throw new Error('ID not registered')
  }
}
