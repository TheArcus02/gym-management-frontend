import useDelete from './use-delete'
import useGetAll from './use-get-all'
import useGetById from './use-get-by-id'

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
