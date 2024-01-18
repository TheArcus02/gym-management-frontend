import { useMutation, useQueryClient } from 'react-query'
import useDelete from './use-delete'
import useGetAll from './use-get-all'
import useGetById from './use-get-by-id'
import axios from 'axios'
import { toast } from 'sonner'
import useAdd from './use-add'
import { trainerSchema } from '@/utils/schema'
import useUpdate from './use-update'
import { useNavigate } from 'react-router-dom'

export const useGetTrainers = ({ search }: { search?: string }) => {
  return useGetAll<Trainer[]>({
    queryKey: ['trainers'],
    url: search
      ? `/api/trainer/search?name=${search}&surname=${search}`
      : '/api/trainer',
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

interface AssignClientParams {
  clientId: number
  trainerId: number
}

export const useAssignClient = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async ({
      clientId,
      trainerId,
    }: AssignClientParams) => {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/trainer/${trainerId}/client/${clientId}`,
        {},
      )
      return data as Trainer
    },
    onMutate: async ({ clientId, trainerId }) => {
      await queryClient.cancelQueries([
        'clients',
        'free_clients',
        'trainer',
        trainerId,
      ])

      const prevClients = queryClient.getQueryData<Client[]>([
        'free_clients',
      ])

      const prevTrainer = queryClient.getQueryData<Trainer>([
        'trainer',
        trainerId,
      ])

      if (prevClients && prevTrainer) {
        const newClients: Client[] = prevClients.filter(
          (c) => c.id !== clientId,
        )
        queryClient.setQueryData<Client[]>(
          ['free_clients'],
          newClients,
        )

        const newClient = prevClients.find((c) => c.id === clientId)
        if (!newClient) return
        const newTrainer: Trainer = {
          ...prevTrainer,
          clients: [...prevTrainer.clients, newClient],
        }
        queryClient.setQueryData<Trainer>(
          ['trainer', trainerId],
          newTrainer,
        )
      }

      return { prevClients, prevTrainer }
    },
    onError: (error, variables, context) => {
      console.log(error)
      toast.error('Error assigning client')
      if (context?.prevClients) {
        queryClient.setQueryData<Client[]>(
          ['clients'],
          context.prevClients,
        )
      }
      if (context?.prevTrainer) {
        queryClient.setQueryData<Trainer>(
          ['trainer', variables.trainerId],
          context.prevTrainer,
        )
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['clients', 'trainer'])
    },
    onSuccess: (variables) => {
      toast.success('Client assigned successfully')
      navigate(`/trainer/${variables.id}/clients`)
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

export const useUnassignClient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ clientId }: AssignClientParams) => {
      const { data } = await axios.delete(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/client/${clientId}/trainer`,
        {},
      )
      return data as Client
    },
    onMutate: async ({ clientId, trainerId }) => {
      await queryClient.cancelQueries(['trainer', trainerId])

      const prevTrainer = queryClient.getQueryData<Trainer>([
        'trainer',
        trainerId,
      ])

      if (prevTrainer) {
        const newClients = prevTrainer.clients.filter(
          (c) => c.id !== clientId,
        )
        const newTrainer: Trainer = {
          ...prevTrainer,
          clients: newClients,
        }

        queryClient.setQueryData<Trainer>(
          ['trainer', trainerId],
          newTrainer,
        )
      }

      return { prevTrainer }
    },
    onError: (error, variables, context) => {
      console.log(error)
      toast.error('Error Unassigning client')
      if (context?.prevTrainer) {
        queryClient.setQueryData<Trainer>(
          ['training', variables.trainerId],
          context.prevTrainer,
        )
      }
    },
    onSettled: (variables) => {
      queryClient.invalidateQueries(['trainer', variables?.trainerId])
    },
    onSuccess: () => {
      toast.success('Client Unassigned successfully')
    },
  })
}
