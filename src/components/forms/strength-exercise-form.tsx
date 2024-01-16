import useAdd from '@/hooks/use-add'
import useUpdate from '@/hooks/use-update'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '../ui/button'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '../ui/form'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { strenghtExerciseSchema } from '@/utils/schema'
import {
  useAddStrengthExercise,
  useUpdateStrengthExercise,
} from '@/hooks/use-exercise'

interface StrengthExerciseFormProps {
  exercise?: StrengthExercise
}

function StrengthExerciseForm({
  exercise,
}: StrengthExerciseFormProps) {
  const form = useForm<z.infer<typeof strenghtExerciseSchema>>({
    resolver: zodResolver(strenghtExerciseSchema),
    defaultValues: {
      name: exercise?.name || '',
      difficulty: exercise?.difficulty || 'EASY',
      category: exercise?.category || 'PUSH',
      type: 'StrengthExercise',
      sets: exercise?.sets || 1,
      reps: exercise?.reps || 1,
      weight: exercise?.weight || 10,
    },
  })

  const { mutate: addExercise } = useAddStrengthExercise()

  const { mutate: updateExercise } = useUpdateStrengthExercise()

  const onSubmit = (
    values: z.infer<typeof strenghtExerciseSchema>,
  ) => {
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
                <Input placeholder='Bench Press' {...field} />
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
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select catgory' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='PUSH'>Push</SelectItem>
                  <SelectItem value='PULL'>Pull</SelectItem>
                  <SelectItem value='LEGS'>Legs</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='sets'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sets</FormLabel>
              <FormControl>
                <Input
                  placeholder='3'
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
          name='reps'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reps</FormLabel>
              <FormControl>
                <Input
                  placeholder='12'
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
          name='weight'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
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
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}

export default StrengthExerciseForm
