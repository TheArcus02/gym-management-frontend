import { workoutPlanSchema } from '@/utils/schema'
import useAdd from './use-add'
import useDelete from './use-delete'
import useGetAll from './use-get-all'
import useGetById from './use-get-by-id'
import useUpdate from './use-update'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { toast } from 'sonner'

export const useGetWorkoutPlans = () => {
  return useGetAll<WorkoutPlan[]>({
    queryKey: ['workout-plans'],
    url: '/api/workout-plan',
    errorMessage: 'Error fetching workout plans',
  })
}

export const useGetWorkoutPlan = (id: number) => {
  return useGetById<WorkoutPlan>({
    queryKey: ['workout-plan', Number(id)],
    url: `/api/workout-plan/${id}`,
    errorMessage: 'Error fetching workout plan',
    id: Number(id),
  })
}

export const useDeleteWorkoutPlan = () => {
  return useDelete({
    url: '/api/workout-plan',
    successMessage: 'Workout Plan deleted successfully',
    errorMessage: 'Error deleting workout plan',
    invalidateQueries: ['workout-plans'],
  })
}

export const useAddWorkoutPlan = () => {
  return useAdd<WorkoutPlan>({
    schema: workoutPlanSchema,
    url: '/api/workout-plan',
    successMessage: 'Workout plan added successfully',
    errorMessage: 'Error adding workout plan',
    invalidateQueries: ['workoutPlans'],
    redirectUrl: '/workout-plan',
  })
}

export const useUpdateWorkoutPlan = () => {
  return useUpdate<WorkoutPlan>({
    schema: workoutPlanSchema,
    url: '/api/workout-plan',
    successMessage: 'Workout plan updated successfully',
    errorMessage: 'Error updating workout plan',
    invalidateQueries: ['workoutPlans'],
    redirectUrl: '/workout-plan',
  })
}

interface AssignTrainingParams {
  workoutPlanId: number
  trainingId: number
}

export const useAssignTraining = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      workoutPlanId,
      trainingId,
    }: AssignTrainingParams) => {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/workout-plan/${workoutPlanId}/training/${trainingId}`,
        {},
      )
      return data as WorkoutPlan
    },
    onMutate: async ({ workoutPlanId, trainingId }) => {
      await queryClient.cancelQueries([
        'trainings',
        'workout-plan',
        workoutPlanId,
      ])

      const prevTrainings = queryClient.getQueryData<Training[]>([
        'trainings',
      ])

      const prevWorkoutPlan = queryClient.getQueryData<WorkoutPlan>([
        'workout-plan',
        workoutPlanId,
      ])

      if (prevTrainings && prevWorkoutPlan) {
        const updatedTraining = prevTrainings.find(
          (t) => t.id === trainingId,
        )
        if (!updatedTraining) return
        const newWorkoutPlan: WorkoutPlan = {
          ...prevWorkoutPlan,
          trainings: [...prevWorkoutPlan.trainings, updatedTraining],
        }
        queryClient.setQueryData<WorkoutPlan>(
          ['workout-plan', workoutPlanId],
          newWorkoutPlan,
        )
      }

      return { prevWorkoutPlan, prevTrainings }
    },
    onError: (error, variables, context) => {
      console.log(error)
      toast.error('Error assigning exercise')
      if (context?.prevTrainings) {
        queryClient.setQueryData<Training[]>(
          ['trainings'],
          context.prevTrainings,
        )
      }
      if (context?.prevWorkoutPlan) {
        queryClient.setQueryData<WorkoutPlan>(
          ['workout-plan', variables.workoutPlanId],
          context.prevWorkoutPlan,
        )
      }
    },
    onSettled: () => {
      toast.success('Training assigned successfully')
      queryClient.invalidateQueries(['trainings'])
    },
  })
}

export const useUnassignTraining = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      workoutPlanId,
      trainingId,
    }: AssignTrainingParams) => {
      const { data } = await axios.delete(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/workout-plan/${workoutPlanId}/training/${trainingId}`,
        {},
      )
      return data as WorkoutPlan
    },
    onMutate: async ({ workoutPlanId, trainingId }) => {
      await queryClient.cancelQueries([
        'trainings',
        'workout-plan',
        workoutPlanId,
      ])

      const prevWorkoutPlan = queryClient.getQueryData<WorkoutPlan>([
        'workout-plan',
        workoutPlanId,
      ])

      if (prevWorkoutPlan) {
        const newWorkoutPlan: WorkoutPlan = {
          ...prevWorkoutPlan,
          trainings: prevWorkoutPlan.trainings.filter(
            (t) => t.id !== trainingId,
          ),
        }
        queryClient.setQueryData<WorkoutPlan>(
          ['workout-plan', workoutPlanId],
          newWorkoutPlan,
        )
      }

      return { prevWorkoutPlan }
    },
    onError: (error, variables, context) => {
      console.log(error)
      toast.error('Error Unassigning exercise')
      if (context?.prevWorkoutPlan) {
        queryClient.setQueryData<WorkoutPlan>(
          ['workout-plan', variables.workoutPlanId],
          context.prevWorkoutPlan,
        )
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['trainings'])
    },
    onSuccess: () => {
      toast.success('Training Unassigned successfully')
    },
  })
}
