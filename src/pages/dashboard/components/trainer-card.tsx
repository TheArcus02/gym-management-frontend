import Loader from '@/components/loader'
import { useGetTrainers } from '@/hooks/use-trainer'
import { Dumbbell } from 'lucide-react'
import DashboardCard from './dashboard-card'

const TrainerCard = () => {
  const { data: trainers, isLoading, isError } = useGetTrainers({})

  return !isLoading && trainers ? (
    <DashboardCard
      title='Trainers'
      Icon={Dumbbell}
      content={
        <>
          <p>Count: {trainers?.length || 0}</p>
          <p>
            Median Salary:{' '}
            {trainers?.reduce((a, b) => a + b.salary, 0) /
              trainers?.length || 0}
          </p>
        </>
      }
      link='/trainer'
    />
  ) : (
    <Loader />
  )
}

export default TrainerCard
