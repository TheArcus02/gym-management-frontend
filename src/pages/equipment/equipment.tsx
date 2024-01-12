import CategoryIndicator from '@/components/category-indicator'
import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import useDelete from '@/hooks/use-delete'
import useGetAll from '@/hooks/use-get-all'
import { Link } from 'react-router-dom'

type EquipmentArray = (Dumbells | Barbell | Machine)[]

const Equipment = () => {
  const {
    data: equipment,
    isLoading,
    isError,
  } = useGetAll<EquipmentArray>({
    queryKey: ['equipment'],
    url: '/api/equipment',
    errorMessage: 'Error fetching equipment',
  })

  const { mutate: deleteEquipment } = useDelete({
    url: '/api/equipment',
    successMessage: 'Equipment deleted successfully',
    errorMessage: 'Error deleting equipment',
    invalidateQueries: ['equipment'],
  })

  const canDisplay = !isLoading && !isError && equipment

  return (
    <SectionWrapper
      title='Equipment'
      isLoading={!canDisplay}
      buttonProps={{
        title: 'Add Equipment',
        link: '/equipment/add',
      }}
    >
      {canDisplay &&
        equipment.map((equipment) => (
          <ObjectCard
            key={equipment.id}
            title={equipment.name}
            description={
              !equipment.ocupied ? (
                <span className='text-green-500'>Free</span>
              ) : (
                <span className='text-yellow-500'>Occupied</span>
              )
            }
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
              <Link to={`/equipment/${equipment.id}`}>
                <Button variant='outline'>Edit</Button>
              </Link>
            }
            deleteFunction={() => deleteEquipment(equipment.id)}
          />
        ))}
    </SectionWrapper>
  )
}

export default Equipment
