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
  } = useGetAll<Equipment[]>({
    queryKey: ['equipment'],
    url: `/api/equipment`,
    errorMessage: 'Error fetching equipments',
  })

  const { data: exercise } = useGetById<Exercise>({
    queryKey: ['exercise', params.id],
    url: `/api/exercise/${params.id}`,
    errorMessage: 'Error fetching exercise',
    id: Number(params.id),
  })

  const { mutate: assignEquipment } = useMutation({
    mutationKey: [params.id],
    mutationFn: async (equipmentId: number) => {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/exercise/${parseInt(
          params.id!,
        )}/equipment/${equipmentId}`,
        {},
      )
      return data as Equipment
    },
    onSuccess: () => {
      toast.success(`Equipment assigned successfully`)
      queryClient.invalidateQueries('equipment')
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error assigning equipment')
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
