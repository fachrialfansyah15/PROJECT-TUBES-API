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
    router.get('/users', [UsersController, 'index'])
    router.get('/users/:id', [UsersController, 'show'])
    router.post('/users', [UsersController, 'store'])
    router.put('/users/:id', [UsersController, 'update'])
    router.delete('/users/:id', [UsersController, 'destroy'])

    // Quizzes CRUD
    router.get('/quizzes', [QuizzesController, 'index'])
    router.get('/quizzes/:id', [QuizzesController, 'show'])
    router.post('/quizzes', [QuizzesController, 'store'])
    router.put('/quizzes/:id', [QuizzesController, 'update'])
    router.delete('/quizzes/:id', [QuizzesController, 'destroy'])

    // Results CRUD
    router.get('/result', [ResultsController, 'index'])
    router.get('/result/:id', [ResultsController, 'show'])
    router.post('/result', [ResultsController, 'store'])
    router.put('/result/:id', [ResultsController, 'update'])
    router.delete('/result/:id', [ResultsController, 'destroy'])

    // User Answers CRUD
    router.get('/user_answers', [UserAnswersController, 'index'])
    router.get('/user_answers/:id', [UserAnswersController, 'show'])
    router.post('/user_answers', [UserAnswersController, 'store'])
    router.put('/user_answers/:id', [UserAnswersController, 'update'])
    router.delete('/user_answers/:id', [UserAnswersController, 'destroy'])

    // Questions CRUD
    router.get('/questions', [QuestionsController, 'index'])
    router.get('/questions/:id', [QuestionsController, 'show'])
    router.post('/questions', [QuestionsController, 'store'])
    router.put('/questions/:id', [QuestionsController, 'update'])
    router.delete('/questions/:id', [QuestionsController, 'destroy'])
  })
  .prefix('/api')
  .use(middleware.auth())
router.post('/register', [SessionController, 'register'])
router.post('/login', [SessionController, 'login'])
