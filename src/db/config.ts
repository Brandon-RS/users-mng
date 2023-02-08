import { connect, set } from 'mongoose'

export const dbConnection = async (): Promise<void> => {
  try {
    set('strictQuery', false)
    void connect(process.env.MONGO_CNN ?? '')
    console.log('DB online')
  } catch (error) {
    console.log(error)
    throw new Error('Error at init DB')
  }
}
