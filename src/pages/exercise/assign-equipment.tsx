import CategoryIndicator from '@/components/category-indicator'
import ObjectCard from '@/components/object-card'
import SearchInput from '@/components/search-input'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import { useGetAllEquipment } from '@/hooks/use-equipment'
import {
  useAssignEquipment,
  useGetExercise,
} from '@/hooks/use-exercise'
import useSearch from '@/hooks/use-search'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const AssignEquipment = () => {
  const [search, setSearch] = useSearch()
  const params = useParams()

  const {
    data: equipment,
    isLoading,
    isError,
    refetch,
  } = useGetAllEquipment({
    search,
  })

  const { data: exercise } = useGetExercise(Number(params.id))

  const { mutate: assignEquipment } = useAssignEquipment()

  const canDisplay = !isLoading && !isError && equipment && exercise

  useEffect(() => {
    refetch()
  }, [refetch, search])

  return (
    <SectionWrapper title='Assign Equipment' isLoading={!canDisplay}>
      <SearchInput
        placeholder='Search for equipment'
        handleInputChange={(e) => setSearch(e.target.value)}
      />
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
