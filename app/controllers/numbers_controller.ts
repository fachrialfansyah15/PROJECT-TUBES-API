import type { HttpContext } from '@adonisjs/core/http'

interface NumbersApiResponse {
  text: string
  number: number
  found?: boolean
  type?: string
}

function isNumbersApiResponse(obj: unknown): obj is NumbersApiResponse {
  if (!obj || typeof obj !== 'object') return false
  const o = obj as Record<string, unknown>
  return (
    typeof o.text === 'string' &&
    typeof o.number === 'number' &&
    (o.found === undefined || typeof o.found === 'boolean') &&
    (o.type === undefined || typeof o.type === 'string')
  )
}

export default class NumbersController {
  public async random({ response }: HttpContext) {
    try {
      const result = await fetch('http://numbersapi.com/random/trivia?json')
      const raw = await result.json()

      if (!isNumbersApiResponse(raw)) {
        console.error('Invalid Numbers API response', raw)
        return response.internalServerError({
          success: false,
          message: 'Invalid response from Numbers API',
        })
      }

      const data = raw // sekarang TypeScript tahu ini NumbersApiResponse

      return response.ok({
        success: true,
        data: {
          number: data.number,
          fact: data.text,
        },
      })
    } catch (error) {
      console.error(error)
      return response.internalServerError({
        success: false,
        message: 'Failed to fetch Numbers API',
      })
    }
  }
}
