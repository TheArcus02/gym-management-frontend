import { useGetTrainings } from '@/hooks/use-training'
import DashboardCard from './dashboard-card'
import { NotebookPen } from 'lucide-react'
import Loader from '@/components/loader'

const TrainingCard = () => {
  const { data: trainings, isLoading, isError } = useGetTrainings({})

  return !isLoading && trainings ? (
    <DashboardCard
      title='Trainings'
      Icon={NotebookPen}
      content={
        <>
          <p>Count: {trainings.length || 0}</p>
        </>
      }
      link='/training'
    />
  ) : (
    <Loader />
  )
}

export default TrainingCard
