import type { HttpContext } from '@adonisjs/core/http'

export default class ExternalQuizController {
  public async getTrivia({ response }: HttpContext) {
    try {
      const triviaRes = await fetch(
        'https://opentdb.com/api.php?amount=5&type=multiple'
      )

      const data = await triviaRes.json()

      return response.ok({
        message: 'Successfully retrieved trivia quiz questions',
        data: data
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to fetch trivia questions',
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }
}
