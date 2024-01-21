import { useGetExercises } from '@/hooks/use-exercise'
import DashboardCard from './dashboard-card'
import { Weight } from 'lucide-react'
import Loader from '@/components/loader'

const ExerciseCard = () => {
  const { data: exercises, isLoading, isError } = useGetExercises({})
  return !isLoading && exercises ? (
    <DashboardCard
      title={'Exercises'}
      Icon={Weight}
      content={
        <>
          <p>Total Count: {exercises.length || 0}</p>
          <p>
            Strehgth Exercises Count:{' '}
            {
              exercises.filter((e) => e.type === 'StrengthExercise')
                .length
            }
          </p>
          <p>
            Cardio Exercises Count:{' '}
            {
              exercises.filter((e) => e.type === 'CardioExercise')
                .length
            }
          </p>
        </>
      }
      link='/exercise'
    />
  ) : (
    <Loader />
  )
}

export default ExerciseCard
