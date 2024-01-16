import { useMutation, useQueryClient } from 'react-query'
import useDelete from './use-delete'
import useGetAll from './use-get-all'
import useGetById from './use-get-by-id'
import axios from 'axios'
import { toast } from 'sonner'

export const useGetClients = () => {
  return useGetAll<Client[]>({
    queryKey: ['clients'],
    url: '/api/client',
    errorMessage: 'Error fetching clients',
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
      await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/client/${clientId}/trainer/${trainerId}`,
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries('trainers')
      toast.success(`Trainer assigned successfully`)
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error assigning trainer')
    },
  })
}
