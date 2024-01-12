import * as z from 'zod'

const cardioExerciseSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(30, { message: 'Name must be at most 30 characters long' }),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  category: z.enum(['PUSH', 'PULL', 'LEGS', 'CADRIO']),
  type: z.enum(['StrengthExercise', 'CardioExercise']),
  duration: z.coerce
    .number()
    .min(1, { message: 'Duration must be at least 1' }),
  tempo: z.coerce
    .number()
    .min(1, { message: 'Tempo must be at least 1' }),
})

const CardioExerciseForm = () => {
  return <div>CardioExerciseForm</div>
}

export default CardioExerciseForm
