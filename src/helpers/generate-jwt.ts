import jwt from 'jsonwebtoken'

export const generateJWT = async (uid: string): Promise<any> => {
  return await new Promise((resolve, reject) => {
    const payload = { uid }
    jwt.sign(payload, process.env.SECRETKEY ?? '', {
      expiresIn: '4h'
    }, (err, token) => {
      if (err !== null) {
        console.log(err)
        reject(err)
      } else { resolve(token) }
    })
  })
}
