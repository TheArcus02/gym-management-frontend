import { useMutation, useQueryClient } from 'react-query'
import useDelete from './use-delete'
import useGetAll from './use-get-all'
import useGetById from './use-get-by-id'
import axios from 'axios'
import { toast } from 'sonner'
import useAdd from './use-add'
import { trainingSchema } from '@/utils/schema'
import useUpdate from './use-update'

export const useGetTrainings = ({ search }: SearchableQuery) => {
  return useGetAll<Training[]>({
    queryKey: ['trainings'],
    url: search
      ? `/api/training/search?name=${search}`
      : '/api/training',
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

interface AssignExerciseParams {
  trainingId: number
  exerciseId: number
}

export const useAssignExercise = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      trainingId,
      exerciseId,
    }: AssignExerciseParams) => {
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
      toast.error('Error assigning training')
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
      toast.success('Exercise assigned successfully')
      queryClient.invalidateQueries(['exercises'])
    },
  })
}

export const useAddTraining = () => {
  return useAdd<Training>({
    schema: trainingSchema,
    url: '/api/training',
    successMessage: 'Training added successfully',
    errorMessage: 'Error adding training',
    invalidateQueries: ['trainings'],
    redirectUrl: '/training',
  })
}

export const useUpdateTraining = () => {
  return useUpdate<Training>({
    schema: trainingSchema,
    url: '/api/training',
    successMessage: 'Training updated successfully',
    errorMessage: 'Error updating training',
    invalidateQueries: ['trainings'],
    redirectUrl: '/training',
  })
}

export const useUnassignExercise = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      trainingId,
      exerciseId,
    }: AssignExerciseParams) => {
      const { data } = await axios.delete(
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

      const prevTraining = queryClient.getQueryData<Training>([
        'training',
        trainingId,
      ])

      if (prevTraining) {
        const newTraining: Training = {
          ...prevTraining,
          exercises: prevTraining.exercises.filter(
            (e) => e.id !== exerciseId,
          ),
        }
        queryClient.setQueryData<Training>(
          ['training', trainingId],
          newTraining,
        )
      }

      return { prevTraining }
    },
    onError: (error, variables, context) => {
      console.log(error)
      toast.error('Error Unassigning exercise')
      if (context?.prevTraining) {
        queryClient.setQueryData<Training>(
          ['training', variables.trainingId],
          context.prevTraining,
        )
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['exercises'])
    },
    onSuccess: () => {
      toast.success('Exercise Unassigned successfully')
    },
  })
}
