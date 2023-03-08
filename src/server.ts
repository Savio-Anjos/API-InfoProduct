import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import { z } from 'zod'

const app = fastify()

const prisma = new PrismaClient()

// Rotas de usuário

app.get('/users', async () => {
  const users = await prisma.user.findMany()

  return { users }
})

app.post('/users', async (request, reply) => {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
  })

  const { name, email } = createUserSchema.parse(request.body)

  await prisma.user.create({
    data: {
      name,
      email,
    }
  })

  return reply.status(201).send()
}) 

// Rotas de category

app.post('/category', async (request, reply) => {
  const createCategorySchema = z.object({
    name: z.string(),
  })

  const { name } = createCategorySchema.parse(request.body)

  await prisma.category.create({
    data: {
      name,
    }
  })

  return reply.status(201).send({ name })
})

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
  console.log('HTTP Server Running')
})