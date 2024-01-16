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
import { workoutPlanSchema } from '@/utils/schema'
import {
  useAddWorkoutPlan,
  useUpdateWorkoutPlan,
} from '@/hooks/use-workout-plan'

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

  const { mutate: addWorkoutPlan } = useAddWorkoutPlan()

  const { mutate: updateWorkoutPlan } = useUpdateWorkoutPlan()

  const onSubmit = (values: z.infer<typeof workoutPlanSchema>) => {
    if (workoutPlan) {
      updateWorkoutPlan({
        values: values,
        id: workoutPlan.id,
      })
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
