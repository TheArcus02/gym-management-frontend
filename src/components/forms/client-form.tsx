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
import useAdd from '@/hooks/use-add'
import useUpdate from '@/hooks/use-update'

const clientSchema = z.object({
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
  email: z.string().email({ message: 'Invalid email' }),
  weight: z.coerce
    .number()
    .min(0, { message: 'Weight cannot be negative' }),
})

interface ClientFormProps {
  client?: Client
}

const ClientForm = ({ client }: ClientFormProps) => {
  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name || '',
      surname: client?.surname || '',
      email: client?.email || '',
      weight: client?.weight || 0,
    },
  })

  const { mutate: addClient } = useAdd<Client>({
    schema: clientSchema,
    url: '/api/client',
    successMessage: 'Client added successfully',
    errorMessage: 'Error adding client',
    invalidateQueries: ['clients'],
    redirectUrl: '/client',
  })

  const { mutate: updateClient } = useUpdate<Client>({
    schema: clientSchema,
    id: client?.id,
    url: '/api/client',
    successMessage: 'Client updated successfully',
    errorMessage: 'Error updating client',
    invalidateQueries: ['clients'],
    redirectUrl: '/client',
  })

  const onSubmit = (values: z.infer<typeof clientSchema>) => {
    if (client) {
      updateClient(values)
    } else {
      addClient(values)
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
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='example@gmail.com'
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
              <FormLabel>weight</FormLabel>
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

export default ClientForm
