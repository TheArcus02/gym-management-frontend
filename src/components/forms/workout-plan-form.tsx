import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '../ui/textarea'
import useAdd from '@/hooks/use-add'
import useUpdate from '@/hooks/use-update'

const workoutPlanSchema = z.object({
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

interface WorkoutPlanFormProps {
  workoutPlan?: WorkoutPlan
}

const WorkoutPlanForm = ({ workoutPlan }: WorkoutPlanFormProps) => {
  const form = useForm<z.infer<typeof workoutPlanSchema>>({
    resolver: zodResolver(workoutPlanSchema),
    defaultValues: {
      name: workoutPlan?.name || '',
      description: workoutPlan?.description || '',
      difficulty: workoutPlan?.difficulty || 'EASY',
    },
  })

  const { mutate: addWorkoutPlan } = useAdd<WorkoutPlan>({
    schema: workoutPlanSchema,
    url: '/api/workout-plan',
    successMessage: 'Workout plan added successfully',
    errorMessage: 'Error adding workout plan',
    invalidateQueries: ['workoutPlans'],
    redirectUrl: '/workout-plan',
  })

  const { mutate: updateWorkoutPlan } = useUpdate<WorkoutPlan>({
    schema: workoutPlanSchema,
    id: workoutPlan?.id,
    url: '/api/workout-plan',
    successMessage: 'Workout plan updated successfully',
    errorMessage: 'Error updating workout plan',
    invalidateQueries: ['workoutPlans'],
    redirectUrl: '/workout-plan',
  })

  const onSubmit = (values: z.infer<typeof workoutPlanSchema>) => {
    if (workoutPlan) {
      updateWorkoutPlan(values)
    } else {
      addWorkoutPlan(values)
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
                <Input placeholder='Upper-Lower' {...field} />
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
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='This is 5 days per week split...'
                  className='resize-none'
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

export default WorkoutPlanForm
