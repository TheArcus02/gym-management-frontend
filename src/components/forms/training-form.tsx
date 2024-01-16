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
import { trainingSchema } from '@/utils/schema'
import {
  useAddTraining,
  useUpdateTraining,
} from '@/hooks/use-training'

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

  const { mutate: addTraining } = useAddTraining()

  const { mutate: updateTraining } = useUpdateTraining()

  const onSubmit = (values: z.infer<typeof trainingSchema>) => {
    if (training) {
      updateTraining({
        values: values,
        id: training.id,
      })
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
