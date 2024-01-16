import { useMutation, useQueryClient } from 'react-query'
import useDelete from './use-delete'
import useGetAll from './use-get-all'
import useGetById from './use-get-by-id'
import axios from 'axios'
import { toast } from 'sonner'
import useAdd from './use-add'
import { trainerSchema } from '@/utils/schema'
import useUpdate from './use-update'

export const useGetTrainers = () => {
  return useGetAll<Trainer[]>({
    queryKey: ['trainers'],
    url: '/api/trainer',
    errorMessage: 'Error fetching trainers',
  })
}

export const useGetTrainer = (id: number) => {
  return useGetById<Trainer>({
    queryKey: ['trainer', Number(id)],
    url: `/api/trainer/${id}`,
    errorMessage: 'Error fetching trainer',
    id: Number(id),
  })
}

export const useDeleteTrainer = () => {
  return useDelete({
    url: '/api/trainer',
    successMessage: 'Trainer deleted successfully',
    errorMessage: 'Error deleting trainer',
    invalidateQueries: ['trainers'],
  })
}

export const useRemoveClient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (clientId: number) => {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/client/${clientId}/trainer`,
        {},
      )
      return data as Client
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['trainer', 'trainers'])
      toast.success(`Client removed successfully`)
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error removing client')
    },
  })
}

interface AssignClientParams {
  clientId: number
  trainerId: number
}

export const useAssignClient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      clientId,
      trainerId,
    }: AssignClientParams) => {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/client/${clientId}/trainer/${trainerId}`,
        {},
      )
      return data as Client
    },
    onSuccess: () => {
      toast.success(`Client assigned successfully`)
      queryClient.invalidateQueries('free_clients')
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error assigning client')
    },
  })
}

export const useAddTrainer = () => {
  return useAdd<Trainer>({
    schema: trainerSchema,
    url: '/api/trainer',
    successMessage: 'Trainer added successfully',
    errorMessage: 'Error adding trainer',
    invalidateQueries: ['trainers'],
    redirectUrl: '/trainer',
  })
}

export const useUpdateTrainer = () => {
  return useUpdate<Trainer>({
    schema: trainerSchema,
    url: '/api/trainer',
    successMessage: 'Trainer updated successfully',
    errorMessage: 'Error updating trainer',
    invalidateQueries: ['trainers'],
    redirectUrl: '/trainer',
  })
}
