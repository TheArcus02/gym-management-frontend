import { useMutation, useQueryClient } from 'react-query'
import useDelete from './use-delete'
import useGetAll from './use-get-all'
import useGetById from './use-get-by-id'
import axios from 'axios'
import { toast } from 'sonner'
import useAdd from './use-add'
import { clientSchema } from '@/utils/schema'
import useUpdate from './use-update'

export const useGetClients = ({ search }: { search?: string }) => {
  return useGetAll<Client[]>({
    queryKey: ['clients'],
    url: search
      ? `/api/client/search?name=${search}&surname=${search}`
      : '/api/client',
    errorMessage: 'Error fetching clients',
  })
}

export const useGetFreeClients = () => {
  return useGetAll<Client[]>({
    queryKey: ['free_clients'],
    url: '/api/client',
    errorMessage: 'Error fetching clients',
    selectFn: (data) => data.filter((client) => !client.trainerId),
  })
}

export const useGetClient = (id: number) => {
  return useGetById<Client>({
    queryKey: ['client', Number(id)],
    url: `/api/client/${id}`,
    errorMessage: 'Error fetching client',
    id: Number(id),
  })
}

export const useDeleteClient = () => {
  return useDelete({
    url: '/api/client',
    successMessage: 'Client deleted successfully',
    errorMessage: 'Error deleting client',
    invalidateQueries: ['clients'],
  })
}

interface AssignTrainerParams {
  clientId: number
  trainerId: number
}

export const useAssignTrainer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      clientId,
      trainerId,
    }: AssignTrainerParams) => {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/client/${clientId}/trainer/${trainerId}`,
      )
      return data as Client
    },
    onMutate: async ({ clientId, trainerId }) => {
      await queryClient.cancelQueries([
        'trainers',
        'client',
        clientId,
      ])

      const prevTrainers = queryClient.getQueryData<Trainer[]>([
        'trainers',
      ])

      const prevClient = queryClient.getQueryData<Client>([
        'client',
        clientId,
      ])

      if (prevTrainers && prevClient) {
        const updatedTrainer = prevTrainers.find(
          (t) => t.id === trainerId,
        )
        if (!updatedTrainer) return
        const newClient: Client = {
          ...prevClient,
          trainerId: updatedTrainer.id,
        }
        queryClient.setQueryData<Client>(
          ['client', clientId],
          newClient,
        )
      }

      return { prevTrainers, prevClient }
    },
    onError: (error, variables, context) => {
      console.log(error)
      toast.error('Error assigning trainer')
      if (context?.prevTrainers) {
        queryClient.setQueryData<Trainer[]>(
          ['trainers'],
          context.prevTrainers,
        )
      }
      if (context?.prevClient) {
        queryClient.setQueryData<Client>(
          ['client', variables.clientId],
          context.prevClient,
        )
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['trainers', 'client'])
    },
    onSuccess: () => {
      toast.success('Trainer assigned successfully')
    },
  })
}

export const useAddClient = () => {
  return useAdd<Client>({
    schema: clientSchema,
    url: '/api/client',
    successMessage: 'Client added successfully',
    errorMessage: 'Error adding client',
    invalidateQueries: ['clients'],
    redirectUrl: '/client',
  })
}

export const useUpdateClient = () => {
  return useUpdate<Client>({
    schema: clientSchema,
    url: '/api/client',
    successMessage: 'Client updated successfully',
    errorMessage: 'Error updating client',
    invalidateQueries: ['clients'],
    redirectUrl: '/client',
  })
}
