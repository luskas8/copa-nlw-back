import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'
import { config } from 'dotenv'
import Fastify from 'fastify'
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

  fastify.get('/pools/count', async () => {
    const pools = await prisma.pool.count()
    return { count: pools }
  })

  await fastify.listen({ port: process.env.PORT || 3333, host: '0.0.0.0' })
}

bootstrap()
