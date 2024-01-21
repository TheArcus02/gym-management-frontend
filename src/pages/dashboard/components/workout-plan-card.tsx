import { useGetWorkoutPlans } from '@/hooks/use-workout-plan'
import DashboardCard from './dashboard-card'
import Loader from '@/components/loader'
import { NotebookText } from 'lucide-react'

const WorkoutPlanCard = () => {
  const {
    data: workoutPlans,
    isLoading,
    isError,
  } = useGetWorkoutPlans({})

  return !isLoading && workoutPlans ? (
    <DashboardCard
      title='Workout Plans'
      Icon={NotebookText}
      content={
        <>
          <p className=''>Count: {workoutPlans.length || 0}</p>
        </>
      }
      link='/workout-plan'
    />
  ) : (
    <Loader />
  )
}

export default WorkoutPlanCard
