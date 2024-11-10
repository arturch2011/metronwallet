import { serialize } from 'cookie'
import jwt from 'jsonwebtoken'

const REFRESH_TOKEN = 'refresh_token'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const response = await fetch('/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  if (response.status === 400) {
    return Response.json(
      { message: 'Credenciais inválidas.' },
      {
        status: response.status,
      },
    )
  }
  if (response.status === 500) {
    return Response.json(
      {
        message: 'Problema com o servidor, tente novamente em alguns minutos.',
      },
      {
        status: response.status,
      },
    )
  }

  const { token } = await response.json()

  // Decode the tokenE
  const decodedToken = jwt.decode(token)

  // Check if the decoded token is an object and if it has a role property
  if (
    decodedToken &&
    typeof decodedToken === 'object' &&
    'role' in decodedToken
  ) {
    const user = {
      id: decodedToken.sub,
      name: decodedToken.name,
      email: decodedToken.email,
      role: decodedToken.role,
    }

    // Set maxAge based on the token's iat and exp if they exist; otherwise, set it to 7 days
    const maxAge =
      decodedToken.iat && decodedToken.exp
        ? decodedToken.exp - decodedToken.iat
        : 60 * 60 * 24 * 7

    const serialized = serialize(REFRESH_TOKEN, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge,
      path: '/',
    })

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Set-Cookie': serialized },
    })
  }
}
