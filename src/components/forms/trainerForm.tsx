import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const trainerSchema = z.object({
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

interface TrainerFormProps {
  trainer?: Trainer
}

const TrainerForm = ({ trainer }: TrainerFormProps) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof trainerSchema>>({
    resolver: zodResolver(trainerSchema),
    defaultValues: {
      name: trainer?.name || '',
      surname: trainer?.surname || '',
      salary: trainer?.salary || 0,
    },
  })

  const { mutate: addTrainer } = useMutation({
    mutationFn: async (values: z.infer<typeof trainerSchema>) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL || ''}/api/trainer`,
        {
          ...values,
          date: 1,
        },
      )
      return data as Trainer
    },
    onSuccess: () => {
      queryClient.invalidateQueries('trainers')
      toast.success(`Trainer added successfully`)
      navigate('/trainer')
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error adding trainer')
    },
  })

  const { mutate: updateTrainer } = useMutation({
    mutationKey: [trainer?.id],
    mutationFn: async (values: z.infer<typeof trainerSchema>) => {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL || ''}/api/trainer/${
          trainer!.id
        }`,
        {
          ...values,
          date: 1,
        },
      )
      return data as Trainer
    },
    onSuccess: () => {
      queryClient.invalidateQueries('trainers')
      toast.success(`Trainer updated successfully`)
      navigate('/trainer')
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error updating trainer')
    },
  })

  const onSubmit = (values: z.infer<typeof trainerSchema>) => {
    if (trainer) {
      updateTrainer(values)
    } else {
      addTrainer(values)
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
                <Input placeholder='John' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='surname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input placeholder='Doe' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='salary'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input
                  placeholder='1000'
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

export default TrainerForm
