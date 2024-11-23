import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  // É interessante sempre cirar rota como entidade, não como verbo como, authentication, e sim session
  app.post('/sessions', authenticate)
}
