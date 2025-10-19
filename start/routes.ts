/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import QuizzesController from '#controllers/quizzes_controller'
import UsersController from '#controllers/users_controller'
import QuestionsController from '#controllers/questions_controller'
import ResultsController from '#controllers/results_controller'
import UserAnswersController from '#controllers/user_answers_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.get('/', [UsersController, 'index'])
    router.get('/:id', [UsersController, 'show'])
    router.post('/', [UsersController, 'store'])
    router.put('/:id', [UsersController, 'update'])
    router.delete('/:id', [UsersController, 'destroy'])
  })
  .prefix('/users')

router
  .group(() => {
    router.get('/', [QuizzesController, 'index'])
    router.get('/:id', [QuizzesController, 'show'])
    router.post('/', [QuizzesController, 'store'])
    router.put('/:id', [QuizzesController, 'update'])
    router.delete('/:id', [QuizzesController, 'destroy'])
  })
  .prefix('/quizzes')

router
  .group(() => {
    router.get('/', [ResultsController, 'index'])
    router.get('/:id', [ResultsController, 'show'])
    router.post('/', [ResultsController, 'store'])
    router.put('/:id', [ResultsController, 'update'])
    router.delete('/:id', [ResultsController, 'destroy'])
  })
  .prefix('/result')

router
  .group(() => {
    router.get('/', [UserAnswersController, 'index'])
    router.get('/:id', [UserAnswersController, 'show'])
    router.post('/', [UserAnswersController, 'store'])
    router.put('/:id', [UserAnswersController, 'update'])
    router.delete('/:id', [UserAnswersController, 'destroy'])
  })
  .prefix('/user_answers')

router
  .group(() => {
    router.get('/', [QuestionsController, 'index'])
    router.get('/:id', [QuestionsController, 'show'])
    router.post('/', [QuestionsController, 'store'])
    router.put('/:id', [QuestionsController, 'update'])
    router.delete('/:id', [QuestionsController, 'destroy'])
  })
  .prefix('/questions')
