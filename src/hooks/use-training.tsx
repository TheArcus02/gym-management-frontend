import { useMutation, useQueryClient } from 'react-query'
import useDelete from './use-delete'
import useGetAll from './use-get-all'
import useGetById from './use-get-by-id'
import axios from 'axios'
import { toast } from 'sonner'

export const useGetTrainings = () => {
  return useGetAll<Training[]>({
    queryKey: ['trainings'],
    url: '/api/training',
    errorMessage: 'Error fetching trainings',
  })
}

export const useGetTraining = (id: number) => {
  return useGetById<Training>({
    queryKey: ['training', Number(id)],
    url: `/api/training/${id}`,
    errorMessage: 'Error fetching training',
    id: Number(id),
  })
}

export const useDeleteTraining = () => {
  return useDelete({
    url: '/api/training',
    successMessage: 'Training deleted successfully',
    errorMessage: 'Error deleting training',
    invalidateQueries: ['trainings'],
  })
}

interface AssignTrainingParams {
  trainingId: number
  exerciseId: number
}

export const useAssignExercise = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      trainingId,
      exerciseId,
    }: AssignTrainingParams) => {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/training/${trainingId}/exercise/${exerciseId}`,
        {},
      )
      return data as Training
    },
    onMutate: async ({ trainingId, exerciseId }) => {
      await queryClient.cancelQueries([
        'exercises',
        'training',
        trainingId,
      ])

      const prevExercises = queryClient.getQueryData<
        ExerciseObject[]
      >(['exercises'])

      const prevTraining = queryClient.getQueryData<Training>([
        'training',
        trainingId,
      ])

      if (prevExercises && prevTraining) {
        const updatedExercise = prevExercises.find(
          (e) => e.id === exerciseId,
        )
        if (!updatedExercise) return
        const newTraining: Training = {
          ...prevTraining,
          exercises: [...prevTraining.exercises, updatedExercise],
        }
        queryClient.setQueryData<Training>(
          ['training', trainingId],
          newTraining,
        )
      }

      return { prevTraining, prevExercises }
    },
    onError: (error, variables, context) => {
      console.log(error)
      toast.error('Error assigning exercise')
      if (context?.prevExercises) {
        queryClient.setQueryData<
          (StrengthExercise | CardioExercise)[]
        >(['exercises'], context.prevExercises)
      }
      if (context?.prevTraining) {
        queryClient.setQueryData<Training>(
          ['training', variables.trainingId],
          context.prevTraining,
        )
      }
    },
    onSettled: () => {
      toast.success('Equipment assigned successfully')
      queryClient.invalidateQueries(['equipment'])
    },
  })
}
