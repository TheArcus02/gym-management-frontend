import useAdd from '@/hooks/use-add'
import useUpdate from '@/hooks/use-update'
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
} from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const trainingSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(30, { message: 'Name must be at most 30 characters long' }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters long',
  }),
})

interface TrainingFormProps {
  training?: Training
}

const TrainingForm = ({ training }: TrainingFormProps) => {
  const form = useForm<z.infer<typeof trainingSchema>>({
    resolver: zodResolver(trainingSchema),
    defaultValues: {
      name: training?.name || '',
      description: training?.description || '',
    },
  })

  const { mutate: addTraining } = useAdd<Training>({
    schema: trainingSchema,
    url: '/api/training',
    successMessage: 'Training added successfully',
    errorMessage: 'Error adding training',
    invalidateQueries: ['trainings'],
    redirectUrl: '/training',
  })

  const { mutate: updateTraining } = useUpdate<Training>({
    schema: trainingSchema,
    id: training?.id,
    url: '/api/training',
    successMessage: 'Training updated successfully',
    errorMessage: 'Error updating training',
    invalidateQueries: ['trainings'],
    redirectUrl: '/training',
  })

  const onSubmit = (values: z.infer<typeof trainingSchema>) => {
    if (training) {
      updateTraining(values)
    } else {
      addTraining(values)
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
                <Input placeholder='Upper' {...field} />
              </FormControl>
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
                  placeholder='This training focuses on the upper body'
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

export default TrainingForm
