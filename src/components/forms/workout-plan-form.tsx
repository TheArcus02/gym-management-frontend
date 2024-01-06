import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
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
import axios from 'axios'
import { toast } from 'sonner'

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
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof workoutPlanSchema>>({
    resolver: zodResolver(workoutPlanSchema),
    defaultValues: {
      name: workoutPlan?.name || '',
      description: workoutPlan?.description || '',
      difficulty: workoutPlan?.difficulty || 'EASY',
    },
  })

  const { mutate: addWorkoutPlan } = useMutation({
    mutationFn: async (values: z.infer<typeof workoutPlanSchema>) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL || ''}/api/workout-plan`,
        {
          ...values,
          date: 1,
        },
      )
      return data as WorkoutPlan
    },
    onSuccess: () => {
      queryClient.invalidateQueries('workoutPlans')
      toast.success('Workout plan added')
      navigate('/workout-plan')
    },
    onError: (error) => {
      console.log(error)
      toast.error('Something went wrong')
    },
  })

  const { mutate: updateWorkoutPlan } = useMutation({
    mutationKey: [workoutPlan?.id],
    mutationFn: async (values: z.infer<typeof workoutPlanSchema>) => {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL || ''}/api/workout-plan/${
          workoutPlan?.id
        }`,
        {
          ...values,
          date: 1,
        },
      )
      return data as WorkoutPlan
    },
    onSuccess: () => {
      queryClient.invalidateQueries('workoutPlans')
      toast.success('Workout plan updated')
      navigate('/workout-plan')
    },
    onError: (error) => {
      console.log(error)
      toast.error('Something went wrong')
    },
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
              <FormLabel>Name</FormLabel>
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
