import CategoryIndicator from '@/components/category-indicator'
import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import { useGetAllEquipment } from '@/hooks/use-equipment'
import {
  useAssignEquipment,
  useGetExercise,
} from '@/hooks/use-exercise'
import { useParams } from 'react-router-dom'

const AssignEquipment = () => {
  const params = useParams()

  const {
    data: equipment,
    isLoading,
    isError,
  } = useGetAllEquipment({})

  const { data: exercise } = useGetExercise(Number(params.id))

  const { mutate: assignEquipment } = useAssignEquipment()

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
                <Button
                  onClick={() =>
                    assignEquipment({
                      equipmentId: equipment.id,
                      exerciseId: exercise.id,
                    })
                  }
                >
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
