import CategoryIndicator from '@/components/category-indicator'
import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import useGetAll from '@/hooks/use-get-all'
import useGetById from '@/hooks/use-get-by-id'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const AssignEquipment = () => {
  const queryClient = useQueryClient()
  const params = useParams()

  const {
    data: equipment,
    isLoading,
    isError,
  } = useGetAll<EquipmentObject[]>({
    queryKey: ['equipment'],
    url: `/api/equipment`,
    errorMessage: 'Error fetching equipments',
  })

  const { data: exercise } = useGetById<ExerciseObject>({
    queryKey: ['exercise', params.id],
    url: `/api/exercise/${params.id}`,
    errorMessage: 'Error fetching exercise',
    id: Number(params.id),
  })

  const { mutate: assignEquipment } = useMutation({
    mutationFn: async (equipmentId: number) => {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/exercise/${parseInt(
          params.id!,
        )}/equipment/${equipmentId}`,
        {},
      )
      return data as Exercise
    },
    onMutate: async (equipmentId: number) => {
      await queryClient.cancelQueries([
        'equipment',
        'exercise',
        params.id,
      ])

      const prevEquipment = queryClient.getQueryData<
        EquipmentObject[]
      >(['equipment'])

      const prevExercise = queryClient.getQueryData<Exercise>([
        'exercise',
        params.id,
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
          ['exercise', params.id],
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
          ['equipment'],
          context.prevEquipment,
        )
      }
    },
    onSettled: () => {
      toast.success('Equipment assigned successfully')
      queryClient.invalidateQueries(['equipment'])
    },
  })

  const canDisplay = !isLoading && !isError && equipment && exercise

  return (
    <SectionWrapper title='Assign Equipment' isLoading={!canDisplay}>
      {canDisplay &&
        equipment.map((equipment) => (
          <ObjectCard
            key={equipment.id}
            title={equipment.name}
            content={
              <>
                <p>Type: {equipment.type}</p>
                {equipment.type === 'Dumbells' ||
                equipment.type === 'Barbell' ? (
                  <p>
                    Weight: {(equipment as Dumbells | Barbell).weight}
                    kg
                  </p>
                ) : (
                  <p>
                    Category:{' '}
                    <CategoryIndicator
                      category={(equipment as Machine).category}
                    />
                  </p>
                )}
              </>
            }
            footer={
              exercise.equipment?.id === equipment.id ? (
                <Button disabled>Assigned</Button>
              ) : (
                <Button onClick={() => assignEquipment(equipment.id)}>
                  Assign
                </Button>
              )
            }
          />
        ))}
    </SectionWrapper>
  )
}

export default AssignEquipment
