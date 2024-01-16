import CategoryIndicator from '@/components/category-indicator'
import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import {
  useDeleteEquipment,
  useGetAllEquipment,
} from '@/hooks/use-equipment'
import { Link } from 'react-router-dom'

export const EquipmentCardContent = ({
  equipment,
}: {
  equipment: EquipmentObject
}) => {
  return (
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
  )
}

export const EquipmentCardDescription = ({
  equipment,
}: {
  equipment: EquipmentObject
}) => {
  return !equipment.ocupied ? (
    <span className='text-green-500'>Free</span>
  ) : (
    <span className='text-yellow-500'>Occupied</span>
  )
}

const Equipment = () => {
  const { data: equipment, isLoading, isError } = useGetAllEquipment()

  const { mutate: deleteEquipment } = useDeleteEquipment()

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
              <EquipmentCardDescription equipment={equipment} />
            }
            content={<EquipmentCardContent equipment={equipment} />}
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
