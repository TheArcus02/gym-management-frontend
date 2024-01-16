import * as z from 'zod'

export const trainerSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(30, { message: 'Name must be at most 30 characters long' }),
  surname: z
    .string()
    .min(2, {
      message: 'Surname must be at least 2 characters long',
    })
    .max(30, {
      message: 'Surname must be at most 30 characters long',
    }),
  salary: z.coerce
    .number()
    .min(0, { message: 'Salary cannot be negative' }),
})

export const clientSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(30, { message: 'Name must be at most 30 characters long' }),
  surname: z
    .string()
    .min(2, {
      message: 'Surname must be at least 2 characters long',
    })
    .max(30, {
      message: 'Surname must be at most 30 characters long',
    }),
  email: z.string().email({ message: 'Invalid email' }),
  weight: z.coerce
    .number()
    .min(0, { message: 'Weight cannot be negative' }),
})

export const workoutPlanSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(30, { message: 'Name must be at most 30 characters long' }),
  description: z
    .string()
    .min(2, {
      message: 'Description must be at least 2 characters long',
    })
    .max(100, {
      message: 'Description must be at most 100 characters long',
    }),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
})

export const trainingSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(30, { message: 'Name must be at most 30 characters long' }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters long',
  }),
})

export const cardioExerciseSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(30, { message: 'Name must be at most 30 characters long' }),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  category: z.enum(['CARDIO']),
  type: z.enum(['StrengthExercise', 'CardioExercise']),
  duration: z.coerce
    .number()
    .min(1, { message: 'Duration must be at least 1' }),
  tempo: z.coerce
    .number()
    .min(1, { message: 'Tempo must be at least 1' }),
})

export const strenghtExerciseSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(30, { message: 'Name must be at most 30 characters long' }),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  category: z.enum(['PUSH', 'PULL', 'LEGS', 'CARDIO']),
  type: z.enum(['StrengthExercise', 'CardioExercise']),
  sets: z.coerce
    .number()
    .min(1, { message: 'Sets must be at least 1' }),
  reps: z.coerce
    .number()
    .min(1, { message: 'Reps must be at least 1' }),
  weight: z.coerce
    .number()
    .min(0, { message: 'Weight cannot be negative' }),
})

export const equipmentSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(30, { message: 'Name must be at most 30 characters long' }),
  type: z.enum(['Dumbells', 'Barbell', 'Machine']),
  weight: z.coerce
    .number()
    .min(0, { message: 'Weight must be at least 0' }),
  category: z.enum(['PUSH', 'PULL', 'LEGS', 'CARDIO']),
})
