import router from '@adonisjs/core/services/router'
import QuizzesController from '#controllers/quizzes_controller'
import UsersController from '#controllers/users_controller'
import QuestionsController from '#controllers/questions_controller'
import ResultsController from '#controllers/results_controller'
import UserAnswersController from '#controllers/user_answers_controller'
import AuthController from '#controllers/auth_controller'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return { 
    message: 'Quiz API Server is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  }
})

router.get('/health', async ({ response }) => {
  return response.ok({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})


// Public routes (tidak perlu authentication)
router
  .group(() => {
    // Quiz routes untuk user
    router.get('/quizzes', [QuizzesController, 'index'])
    router.get('/quizzes/:id', [QuizzesController, 'show'])
    
    // Quiz management routes (temporary public for demo)
    router.post('/quizzes', [QuizzesController, 'store'])
    router.put('/quizzes/:id', [QuizzesController, 'update'])
    router.delete('/quizzes/:id', [QuizzesController, 'destroy'])
    
    // Auth routes
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])
    
    // Results routes untuk user (untuk melihat hasil quiz)
    router.get('/results', [ResultsController, 'index'])
    router.get('/results/:id', [ResultsController, 'show'])
    router.post('/results', [ResultsController, 'store'])
    
    // User answers routes untuk user
    router.post('/user_answers', [UserAnswersController, 'store'])
  })
  .prefix('/api')

// Protected routes (perlu authentication)
router
  .group(() => {
    // Admin user management
    router.get('/users', [UsersController, 'index'])
    router.get('/users/:id', [UsersController, 'show'])
    router.post('/users', [UsersController, 'store'])
    router.put('/users/:id', [UsersController, 'update'])
    router.delete('/users/:id', [UsersController, 'destroy'])
    
    // Admin results management
    router.put('/results/:id', [ResultsController, 'update'])
    router.delete('/results/:id', [ResultsController, 'destroy'])
    
    // Admin user answers management
    router.get('/user_answers', [UserAnswersController, 'index'])
    router.get('/user_answers/:id', [UserAnswersController, 'show'])
    router.put('/user_answers/:id', [UserAnswersController, 'update'])
    router.delete('/user_answers/:id', [UserAnswersController, 'destroy'])
    
    // Admin questions management
    router.get('/questions', [QuestionsController, 'index'])
    router.get('/questions/:id', [QuestionsController, 'show'])
    router.post('/questions', [QuestionsController, 'store'])
    router.put('/questions/:id', [QuestionsController, 'update'])
    router.delete('/questions/:id', [QuestionsController, 'destroy'])
  })
  .prefix('/api')
  .use(middleware.auth())
