import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'
import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import ShortUniqueId from 'short-unique-id'
import { z } from 'zod'
config()

const prisma = new PrismaClient({
  log: ['query']
})

async function bootstrap () {
  const fastify = Fastify({
    logger: process.env.NODE_ENV === 'dev'
  })

  await fastify.register(cors, {
    origin: true
  })

  fastify.get('/polls/count', async () => {
    const polls = await prisma.poll.count()
    return { count: polls }
  })

  fastify.get('/users/count', async () => {
    const users = await prisma.user.count()
    return { count: users }
  })

  fastify.get('/guesses/count', async () => {
    const guesses = await prisma.guess.count()
    return { count: guesses }
  })

  fastify.post('/polls', async (request: FastifyRequest, reply: FastifyReply) => {
    const createPollBody = z.object({
      title: z.string()
    })
    const generate = new ShortUniqueId({ length: 6 })
    const code = String(generate()).toUpperCase()
    const { title } = createPollBody.parse(request.body)

    await prisma.poll.create({
      data: {
        title,
        code
      }
    })

    reply.status(201).send({ code })
  })

  await fastify.listen({ port: process.env.PORT || 3333, host: '0.0.0.0' })
}

bootstrap()
