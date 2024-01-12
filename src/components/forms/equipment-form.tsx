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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const equipmentSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(30, { message: 'Name must be at most 30 characters long' }),
  type: z.enum(['Dumbells', 'Barbell', 'Machine']),
  weight: z.coerce
    .number()
    .min(0, { message: 'Weight must be at least 0' }),
  category: z.enum(['PUSH', 'PULL', 'LEGS', 'CARDIO']),
})

interface EquipmentFormProps {
  equipment?: Dumbells | Barbell | Machine
}

const EquipmentForm = ({ equipment }: EquipmentFormProps) => {
  const form = useForm<z.infer<typeof equipmentSchema>>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      name: equipment?.name || '',
      type: equipment?.type || 'Dumbells',
      weight:
        equipment?.type === 'Machine'
          ? 0
          : (equipment as Dumbells)?.weight || 0,
      category:
        equipment?.type === 'Machine'
          ? (equipment as Machine).category
          : 'PUSH',
    },
  })

  const { mutate: addEquipment } = useAdd<Equipment>({
    schema: equipmentSchema,
    url: '/api/equipment',
    successMessage: 'Equipment added successfully',
    errorMessage: 'Error adding equipment',
    invalidateQueries: ['equipment'],
    redirectUrl: '/equipment',
  })

  const { mutate: updateEquipment } = useUpdate<Equipment>({
    schema: equipmentSchema,
    id: equipment?.id,
    url: '/api/equipment',
    successMessage: 'Equipment updated successfully',
    errorMessage: 'Error updating equipment',
    invalidateQueries: ['equipment'],
    redirectUrl: '/equipment',
  })

  const onSubmit = (values: z.infer<typeof equipmentSchema>) => {
    if (equipment) {
      updateEquipment(values)
    } else {
      addEquipment(values)
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
                <Input placeholder='GymBeam Bar' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Type' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Dumbells'>Dumbells</SelectItem>
                  <SelectItem value='Barbell'>Barbell</SelectItem>
                  <SelectItem value='Machine'>Machine</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch('type') === 'Machine' ? (
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
        ) : (
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
        )}
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}

export default EquipmentForm
