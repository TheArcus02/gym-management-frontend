import Loader from '@/components/loader'
import { useGetAllEquipment } from '@/hooks/use-equipment'
import DashboardCard from './dashboard-card'
import { Anvil } from 'lucide-react'

const EquipmentCard = () => {
  const {
    data: equipment,
    isLoading,
    isError,
  } = useGetAllEquipment({})
  return !isLoading && equipment ? (
    <DashboardCard
      title={'Equipment'}
      Icon={Anvil}
      content={
        <>
          <p>Total Count: {equipment.length || 0}</p>
          <p>
            Barbells Count:{' '}
            {equipment.filter((e) => e.type === 'Barbell').length}
          </p>
          <p>
            Dumbbells Count:{' '}
            {equipment.filter((e) => e.type === 'Dumbells').length}
          </p>
          <p>
            Machines Count:{' '}
            {equipment.filter((e) => e.type === 'Machine').length}
          </p>
          <p>
            Ocuppied Equipment Count:{' '}
            {equipment.filter((e) => e.isOccupied).length}
          </p>
          <p>
            Available Equipment Count:{' '}
            {equipment.filter((e) => !e.isOccupied).length}
          </p>
        </>
      }
      link='/equipment'
    />
  ) : (
    <Loader />
  )
}

export default EquipmentCard
