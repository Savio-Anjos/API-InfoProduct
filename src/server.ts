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

// Listar products
app.get('/product', async () => {
    const products = await prisma.product.findMany()

    return { products }
})

// Deletar produto 
app.delete('/product', async (request) => {
  const deleteProductSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteProductSchema.parse(request.body)


  const deleteProduct = await prisma.product.delete({
    where: {
      id: id,
    }
  })

  return { deleteProduct }
})


// Rotas de order

// Criar order
app.post('/order', async (request, reply) => {
  const createOrderSchema = z.object({
    name: z.string(),
  })
  
  const { name } = createOrderSchema.parse(request.body)

  const order = await prisma.order.create({
    data: {
      name: name,
    }
  })

  return reply.status(201).send(order)
})

//Listar orders
app.get('/order', async () => {
  const orders = await prisma.order.findMany()

  return { orders }
})

//Deletar order
app.delete('/order', async (request) => {
  const deleteOrderSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteOrderSchema.parse(request.body)

  const deleteOrders = await prisma.order.delete({
    where: {
      id: id,
    }
  })

  return { deleteOrders }
})

// rotas de item
app.post("/item", async (request, reply) => {
  const createItemSchema = z.object({
    amount: z.number(),
    order_id: z.string(),
    product_id: z.string(),
  })

  const { amount, order_id, product_id } = createItemSchema.parse(request.body)

  const item = await prisma.item.create({
    data: {
      amount,
      order_id,
      product_id
    }
  })

  return reply.status(201).send(item)
})

//listar items
app.get('/item', async () => {
  const items = await prisma.item.findMany()

  return { items }
})

//deletar item
app.delete('/item', async (request, reply) => {
  const deleteItemSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteItemSchema.parse(request.body)

  const deleteItem = await prisma.item.delete({
    where: {
      id: id
    }
  })
  
  return reply.status(201).send(deleteItem)

})


// rotas de imagem

//--------------------------
app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
  console.log('HTTP Server Running')
})