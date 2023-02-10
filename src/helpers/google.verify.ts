import { OAuth2Client } from 'google-auth-library'

const clientId = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(clientId)

export async function googleVerify (token: string): Promise<any> {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientId
  })
  const { name, email, picture } = ticket.getPayload()

  return { name, email, picture }
}
