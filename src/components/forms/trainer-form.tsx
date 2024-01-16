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
import { trainerSchema } from '@/utils/schema'
import { useAddTrainer, useUpdateTrainer } from '@/hooks/use-trainer'

interface TrainerFormProps {
  trainer?: Trainer
}

const TrainerForm = ({ trainer }: TrainerFormProps) => {
  const form = useForm<z.infer<typeof trainerSchema>>({
    resolver: zodResolver(trainerSchema),
    defaultValues: {
      name: trainer?.name || '',
      surname: trainer?.surname || '',
      salary: trainer?.salary || 0,
    },
  })

  const { mutate: addTrainer } = useAddTrainer()

  const { mutate: updateTrainer } = useUpdateTrainer()

  const onSubmit = (values: z.infer<typeof trainerSchema>) => {
    if (trainer) {
      updateTrainer({ values: values, id: trainer.id })
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
