import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useAdd from '@/hooks/use-add'
import useUpdate from '@/hooks/use-update'

const cardioExerciseSchema = z.object({
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

interface CardioExerciseFormProps {
  exercise?: CardioExercise
}

const CardioExerciseForm = ({
  exercise,
}: CardioExerciseFormProps) => {
  const form = useForm<z.infer<typeof cardioExerciseSchema>>({
    resolver: zodResolver(cardioExerciseSchema),
    defaultValues: {
      name: exercise?.name || '',
      difficulty: exercise?.difficulty || 'EASY',
      category: 'CARDIO',
      type: 'CardioExercise',
      duration: exercise?.duration || 40,
      tempo: exercise?.tempo || 5,
    },
  })

  const { mutate: addExercise } = useAdd<CardioExercise>({
    schema: cardioExerciseSchema,
    url: '/api/exercise',
    successMessage: 'Exercise added successfully',
    errorMessage: 'Error adding exercise',
    invalidateQueries: ['exercises'],
    redirectUrl: '/exercise',
  })

  const { mutate: updateExercise } = useUpdate<CardioExercise>({
    schema: cardioExerciseSchema,
    id: exercise?.id,
    url: '/api/exercise',
    successMessage: 'Exercise updated successfully',
    errorMessage: 'Error updating exercise',
    invalidateQueries: ['exercises'],
    redirectUrl: '/exercise',
  })

  const onSubmit = (values: z.infer<typeof cardioExerciseSchema>) => {
    if (exercise) {
      updateExercise(values)
    } else {
      addExercise(values)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-5'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Running' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='difficulty'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select difficulty' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='EASY'>Easy</SelectItem>
                  <SelectItem value='MEDIUM'>Medium</SelectItem>
                  <SelectItem value='HARD'>Hard</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='duration'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input
                  placeholder='40'
                  type='number'
                  inputMode='decimal'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tempo'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reps</FormLabel>
              <FormControl>
                <Input
                  placeholder='5'
                  type='number'
                  inputMode='decimal'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}

export default CardioExerciseForm
