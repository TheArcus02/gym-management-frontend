import { useMutation, useQueryClient } from 'react-query'
import useDelete from './use-delete'
import useGetAll from './use-get-all'
import useGetById from './use-get-by-id'
import axios from 'axios'
import { toast } from 'sonner'
import useAdd from './use-add'
import {
  cardioExerciseSchema,
  strenghtExerciseSchema,
} from '@/utils/schema'
import useUpdate from './use-update'

export const useGetExercises = () => {
  return useGetAll<ExerciseObject[]>({
    queryKey: ['exercises'],
    url: '/api/exercise',
    errorMessage: 'Error fetching exercises',
  })
}

export const useGetExercise = (id: number) => {
  return useGetById<ExerciseObject>({
    queryKey: ['exercise', Number(id)],
    url: `/api/exercise/${id}`,
    errorMessage: 'Error fetching exercise',
    id: Number(id),
  })
}

export const useDeleteExercise = () => {
  return useDelete({
    url: '/api/exercise',
    successMessage: 'Exercise deleted successfully',
    errorMessage: 'Error deleting exercise',
    invalidateQueries: ['exercises'],
  })
}

interface AssignEquipmentParams {
  exerciseId: number
  equipmentId: number
}

export const useAssignEquipment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      exerciseId,
      equipmentId,
    }: AssignEquipmentParams) => {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/exercise/${exerciseId}/equipment/${equipmentId}`,
        {},
      )
      return data as Exercise
    },
    onMutate: async ({ exerciseId, equipmentId }) => {
      await queryClient.cancelQueries([
        'all-equipment',
        'exercise',
        exerciseId,
      ])

      const prevEquipment = queryClient.getQueryData<
        EquipmentObject[]
      >(['all-equipment'])

      const prevExercise = queryClient.getQueryData<Exercise>([
        'exercise',
        exerciseId,
      ])

      if (prevExercise && prevEquipment) {
        const updatedEquipment = prevEquipment.find(
          (e) => e.id === equipmentId,
        )
        if (!updatedEquipment) return
        const newExercise: Exercise = {
          ...prevExercise,
          equipment: updatedEquipment,
        }
        queryClient.setQueryData<Exercise>(
          ['exercise', exerciseId],
          newExercise,
        )
      }

      return { prevEquipment }
    },
    onError: (error, variables, context) => {
      console.log(error)
      toast.error('Error assigning equipment')
      if (context?.prevEquipment) {
        queryClient.setQueryData<Equipment[]>(
          ['all-equipment'],
          context.prevEquipment,
        )
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['all-equipment'])
    },
    onSuccess: () => {
      toast.success('Equipment assigned successfully')
    },
  })
}

export const useAddCardioExercise = () => {
  return useAdd<CardioExercise>({
    schema: cardioExerciseSchema,
    url: '/api/exercise',
    successMessage: 'Exercise added successfully',
    errorMessage: 'Error adding exercise',
    invalidateQueries: ['exercises'],
    redirectUrl: '/exercise',
  })
}

export const useUpdateCardioExercise = () => {
  return useUpdate<CardioExercise>({
    schema: cardioExerciseSchema,
    url: '/api/exercise',
    successMessage: 'Exercise updated successfully',
    errorMessage: 'Error updating exercise',
    invalidateQueries: ['exercises'],
    redirectUrl: '/exercise',
  })
}

export const useAddStrengthExercise = () => {
  return useAdd<StrengthExercise>({
    schema: strenghtExerciseSchema,
    url: '/api/exercise',
    successMessage: 'Exercise added successfully',
    errorMessage: 'Error adding exercise',
    invalidateQueries: ['exercises'],
    redirectUrl: '/exercise',
  })
}

export const useUpdateStrengthExercise = () => {
  return useUpdate<StrengthExercise>({
    schema: strenghtExerciseSchema,
    url: '/api/exercise',
    successMessage: 'Exercise updated successfully',
    errorMessage: 'Error updating exercise',
    invalidateQueries: ['exercises'],
    redirectUrl: '/exercise',
  })
}
