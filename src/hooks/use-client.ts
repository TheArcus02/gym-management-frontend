import { useMutation, useQueryClient } from 'react-query'
import useDelete from './use-delete'
import useGetAll from './use-get-all'
import useGetById from './use-get-by-id'
import axios from 'axios'
import { toast } from 'sonner'
import useAdd from './use-add'
import { clientSchema } from '@/utils/schema'
import useUpdate from './use-update'

export const useGetClients = ({ search }: SearchableQuery) => {
  return useGetAll<Client[]>({
    queryKey: ['clients'],
    url: search
      ? `/api/client/search?name=${search}&surname=${search}`
      : '/api/client',
    errorMessage: 'Error fetching clients',
  })
}

export const useGetFreeClients = ({ search }: SearchableQuery) => {
  return useGetAll<Client[]>({
    queryKey: ['free_clients'],
    url: search
      ? `/api/client/search?name=${search}&surname=${search}`
      : '/api/client',
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

export const useAssignWorkoutPlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      clientId,
      workoutPlanId,
    }: {
      clientId: number
      workoutPlanId: number
    }) => {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/client/${clientId}/workout-plan/${workoutPlanId}`,
      )
      return data as Client
    },
    onMutate: async ({ clientId, workoutPlanId }) => {
      await queryClient.cancelQueries([
        'workout-plans',
        'client',
        clientId,
      ])

      const prevWorkoutPlans = queryClient.getQueryData<
        WorkoutPlan[]
      >(['workout-plans'])

      const prevClient = queryClient.getQueryData<Client>([
        'client',
        clientId,
      ])

      if (prevWorkoutPlans && prevClient) {
        const updatedWorkoutPlan = prevWorkoutPlans.find(
          (t) => t.id === workoutPlanId,
        )
        if (!updatedWorkoutPlan) return
        const newClient: Client = {
          ...prevClient,
          workoutPlan: updatedWorkoutPlan,
        }
        queryClient.setQueryData<Client>(
          ['client', clientId],
          newClient,
        )
      }

      return { prevWorkoutPlans, prevClient }
    },
    onError: (error, variables, context) => {
      console.log(error)
      toast.error('Error assigning workout plan')
      if (context?.prevWorkoutPlans) {
        queryClient.setQueryData<WorkoutPlan[]>(
          ['workout-plans'],
          context.prevWorkoutPlans,
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
      queryClient.invalidateQueries(['workout-plans', 'client'])
    },
    onSuccess: () => {
      toast.success('Workout plan assigned successfully')
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

interface StartTrainingParams {
  clientId: number
  exerciseId: number
  trainingId: number
}

export const useStartTrainingClient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      clientId,
      exerciseId,
    }: StartTrainingParams) => {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/client/${clientId}/start-training/${exerciseId}`,
      )
      return data as Client
    },
    onMutate: async ({ clientId, exerciseId, trainingId }) => {
      await queryClient.cancelQueries([
        'training',
        'client',
        clientId,
        trainingId,
      ])

      const prevClient = queryClient.getQueryData<Client>([
        'client',
        clientId,
      ])

      const prevTraining = queryClient.getQueryData<Training>([
        'training',
        trainingId,
      ])

      const prevExercise = prevTraining?.exercises.find(
        (e) => e.id === exerciseId,
      )

      if (prevClient && prevTraining && prevExercise) {
        const newTraining: Training = {
          ...prevTraining,
          exercises: prevTraining.exercises.map((e) => {
            if (e.equipment?.isOccupied === true) {
              return {
                ...e,
                equipment: {
                  ...e.equipment,
                  isOccupied: false,
                  occupiedBy: null,
                },
              }
            }
            if (
              e.id === exerciseId ||
              e.equipment.id === prevExercise.equipment.id
            ) {
              return {
                ...e,
                equipment: {
                  ...e.equipment,
                  isOccupied: true,
                  occupiedBy: clientId,
                },
              }
            }
            return e
          }),
        }
        const newClient: Client = {
          ...prevClient,
          workoutPlan: {
            ...prevClient.workoutPlan,
            trainings: prevClient.workoutPlan.trainings.map((t) => {
              if (t.id === trainingId) {
                return newTraining
              }
              return t
            }),
          },
        }
        queryClient.setQueryData<Client>(
          ['client', clientId],
          newClient,
        )
        queryClient.setQueryData<Training>(
          ['training', trainingId],
          newTraining,
        )
      }
      return { prevClient, prevTraining }
    },
    onError: (error, variables, context) => {
      console.log(error)
      toast.error('Error starting training')
      if (context?.prevClient) {
        queryClient.setQueryData<Client>(
          ['client', variables.clientId],
          context.prevClient,
        )
      }
      if (context?.prevTraining) {
        queryClient.setQueryData<Training>(
          ['training', variables.trainingId],
          context.prevTraining,
        )
      }
    },
    onSettled: (variables) => {
      queryClient.invalidateQueries([
        'trainings',
        'client',
        variables?.id,
      ])
    },
    onSuccess: () => {
      toast.success('Training started successfully')
    },
  })
}

export const useStopTrainingClient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      clientId,
      exerciseId,
    }: StartTrainingParams) => {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/client/${clientId}/stop-training/${exerciseId}`,
      )
      return data as Client
    },
    onMutate: async ({ clientId, trainingId }) => {
      await queryClient.cancelQueries([
        'training',
        'client',
        clientId,
        trainingId,
      ])

      const prevClient = queryClient.getQueryData<Client>([
        'client',
        clientId,
      ])

      const prevTraining = queryClient.getQueryData<Training>([
        'training',
        trainingId,
      ])

      if (prevClient && prevTraining) {
        const newTraining: Training = {
          ...prevTraining,
          exercises: prevTraining.exercises.map((e) => ({
            ...e,
            equipment: {
              ...e.equipment,
              isOccupied: false,
              occupiedBy: null,
            },
          })),
        }
        const newClient: Client = {
          ...prevClient,
          workoutPlan: {
            ...prevClient.workoutPlan,
            trainings: prevClient.workoutPlan.trainings.map((t) => {
              if (t.id === trainingId) {
                return newTraining
              }
              return t
            }),
          },
        }
        queryClient.setQueryData<Client>(
          ['client', clientId],
          newClient,
        )
        queryClient.setQueryData<Training>(
          ['training', trainingId],
          newTraining,
        )
      }
      return { prevClient, prevTraining }
    },
    onError: (error, variables, context) => {
      console.log(error)
      toast.error('Error stoping training')
      if (context?.prevClient) {
        queryClient.setQueryData<Client>(
          ['client', variables.clientId],
          context.prevClient,
        )
      }
      if (context?.prevTraining) {
        queryClient.setQueryData<Training>(
          ['training', variables.trainingId],
          context.prevTraining,
        )
      }
    },
    onSettled: (variables) => {
      queryClient.invalidateQueries([
        'trainings',
        'client',
        variables?.id,
      ])
    },
    onSuccess: () => {
      toast.success('Training stoped successfully')
    },
  })
}
