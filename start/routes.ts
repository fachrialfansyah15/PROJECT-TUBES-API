import router from '@adonisjs/core/services/router'
import QuizzesController from '#controllers/quizzes_controller'
import UsersController from '#controllers/users_controller'
import QuestionsController from '#controllers/questions_controller'
import ResultsController from '#controllers/results_controller'
import UserAnswersController from '#controllers/user_answers_controller'
import SessionController from '#controllers/auth_controller'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return { hello: 'world' }
})

// Auth
router
  .group(() => {
    router.get('/users', [UsersController, 'index']).use(middleware.role(['admin']))
    router.get('/users/:id', [UsersController, 'show']).use(middleware.role(['admin', 'user']))
    router.post('/users', [UsersController, 'store']).use(middleware.role(['admin']))
    router.put('/users/:id', [UsersController, 'update']).use(middleware.role(['admin', 'user']))
    router.delete('/users/:id', [UsersController, 'destroy']).use(middleware.role(['admin']))

    // Quizzes CRUD
    router.get('/quizzes', [QuizzesController, 'index']).use(middleware.role(['admin', 'user']))
    router.get('/quizzes/:id', [QuizzesController, 'show']).use(middleware.role(['admin', 'user']))
    router.post('/quizzes', [QuizzesController, 'store']).use(middleware.role(['admin']))
    router.put('/quizzes/:id', [QuizzesController, 'update']).use(middleware.role(['admin']))
    router.delete('/quizzes/:id', [QuizzesController, 'destroy']).use(middleware.role(['admin']))

    // Results CRUD
    router.get('/result', [ResultsController, 'index']).use(middleware.role(['admin']))
    router.get('/result/:id', [ResultsController, 'show']).use(middleware.role(['admin', 'user']))
    router.post('/result', [ResultsController, 'store']).use(middleware.role(['admin']))
    router.put('/result/:id', [ResultsController, 'update']).use(middleware.role(['admin']))
    router.delete('/result/:id', [ResultsController, 'destroy']).use(middleware.role(['admin']))

    // User Answers CRUD
    router.get('/user_answers', [UserAnswersController, 'index']).use(middleware.role(['admin']))
    router.get('/user_answers/:id', [UserAnswersController, 'show']).use(middleware.role(['admin', 'user']))
    router.post('/user_answers', [UserAnswersController, 'store']).use(middleware.role(['user']))
    router.put('/user_answers/:id', [UserAnswersController, 'update']).use(middleware.role(['admin']))
    router.delete('/user_answers/:id', [UserAnswersController, 'destroy']).use(middleware.role(['admin']))

    // Questions CRUD
    router.get('/questions', [QuestionsController, 'index']).use(middleware.role(['admin']))
    router.get('/questions/:id', [QuestionsController, 'show']).use(middleware.role(['admin']))
    router.post('/questions', [QuestionsController, 'store']).use(middleware.role(['admin']))
    router.put('/questions/:id', [QuestionsController, 'update']).use(middleware.role(['admin']))
    router.delete('/questions/:id', [QuestionsController, 'destroy']).use(middleware.role(['admin']))
  })
  .prefix('/api')
  .use(middleware.auth())
router.post('/register', [SessionController, 'register'])
router.post('/login', [SessionController, 'login'])

router.post('/create-admin', async ({ request, response }) => {
  const secret = request.input('secret')
  if (secret !== 'Faidikraynalmir') {
    return response.unauthorized({ message: 'Invalid secret key' })
  }

  const User = (await import('#models/user')).default
  const Hash = (await import('@adonisjs/core/services/hash')).default

  const user = await User.create({
    name: 'Initial Admin',
    email: request.input('email'),
    password: await Hash.make(request.input('password')),
    role: 'admin',
  })

  return response.created({
    message: 'Admin berhasil dibuat!',
    user,
  })
})