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

// Criar categoria
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

//Listar categorias
app.get('/category', async () => {
  const categories = await prisma.category.findMany();

  return { categories }
})


//Deletar categoria
app.delete('/category', async (request) => {
  const deleteCategorySchema = z.object({
    id: z.string(),
  })

  const { id } = deleteCategorySchema.parse(request.body)


  const deleteCategory = await prisma.category.delete({
    where: {
      id: id,
    }
  })

  return { deleteCategory }
})

// Rotas de product

//Criar produto
app.post('/product', async (request, reply) => {
  const createProductSchema = z.object({
    name: z.string(),
    price: z.string(),
    description: z.string(),
    category_id: z.string(),
  })

  const { name, price, description, category_id } = createProductSchema.parse(request.body)

  const produto = await prisma.product.create({
    data: {
      name,
      price,
      description,
      category_id,
    }
  })

  return reply.status(201).send(produto)
})

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
  console.log('HTTP Server Running')
})