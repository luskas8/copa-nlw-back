import { config } from 'dotenv'
import Fastify from 'fastify'
config()

async function bootstrap () {
  const fastify = Fastify({
    logger: process.env.NODE_ENV === 'dev'
  })

  await fastify.listen({ port: process.env.PORT || 3333 })
}

bootstrap()
