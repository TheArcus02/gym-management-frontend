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
import { cardioExerciseSchema } from '@/utils/schema'
import {
  useAddCardioExercise,
  useUpdateCardioExercise,
} from '@/hooks/use-exercise'

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

  const { mutate: addExercise } = useAddCardioExercise()

  const { mutate: updateExercise } = useUpdateCardioExercise()

  const onSubmit = (values: z.infer<typeof cardioExerciseSchema>) => {
    if (exercise) {
      updateExercise({
        values: values,
        id: exercise.id,
      })
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
