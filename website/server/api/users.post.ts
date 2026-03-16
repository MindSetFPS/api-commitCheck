// server/api/users.post.ts
import { db } from '../db'
import { users } from '../schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // Validación básica
    if (!body.username || !body.email || !body.password) {
      throw createError({
        statusCode: 400,
        message: 'username, email y password son requeridos'
      })
    }

    const newUser = await db.insert(users).values({
      username: body.username,
      email: body.email,
      password: body.password,
    }).returning()

    return { user: newUser[0] }
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      message: 'No se pudo crear el usuario'
    })
  }
})