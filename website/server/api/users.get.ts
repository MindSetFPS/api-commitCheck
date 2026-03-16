// server/api/users.get.ts
import { db } from '../db'
import { users } from '../schema'

export default defineEventHandler(async (event) => {
  try {
    const result = await db.select().from(users)
    return { users: result }
  } catch (error) {
    console.error(error)
    return { error: 'No se pudieron obtener los usuarios' }
  }
})