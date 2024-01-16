import { workoutPlanSchema } from '@/utils/schema'
import useAdd from './use-add'
import useDelete from './use-delete'
import useGetAll from './use-get-all'
import useGetById from './use-get-by-id'
import useUpdate from './use-update'

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
