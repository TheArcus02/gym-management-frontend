import DifficultyIndicator from '@/components/difficulty-indicator'
import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import useDelete from '@/hooks/use-delete'
import useGetAll from '@/hooks/use-get-all'
import { Link } from 'react-router-dom'

const WorkoutPlan = () => {
  const {
    data: workoutPlans,
    isLoading,
    isError,
  } = useGetAll<WorkoutPlan[]>({
    queryKey: ['workout-plans'],
    url: '/api/workout-plan',
    errorMessage: 'Error fetching workout plans',
  })

  const { mutate: deleteWorkoutPlan } = useDelete({
    url: '/api/workout-plan',
    successMessage: 'Workout Plan deleted successfully',
    errorMessage: 'Error deleting workout plan',
    invalidateQueries: ['workout-plans'],
  })

  const canDisplay = !isLoading && !isError && workoutPlans

  return (
    <SectionWrapper
      title='Workout Plans'
      buttonProps={{
        title: 'Add Workout Plan',
        link: '/workout-plan/add',
      }}
      isLoading={!canDisplay}
    >
      {canDisplay &&
        workoutPlans.map((workoutPlan) => (
          <ObjectCard
            title={workoutPlan.name}
            description={
              <DifficultyIndicator
                difficulty={workoutPlan.difficulty}
              />
            }
            content={<p>{workoutPlan.description}</p>}
            footer={
              <>
                <Link to={`/workout-plan/${workoutPlan.id}`}>
                  <Button variant='outline'>Edit</Button>
                </Link>
                <Link
                  to={`/workout-plan/${workoutPlan.id}/trainings`}
                >
                  <Button size='sm'>Manage Trainings</Button>
                </Link>
              </>
            }
            deleteFunction={() => deleteWorkoutPlan(workoutPlan.id)}
          />
        ))}
    </SectionWrapper>
  )
}

export default WorkoutPlan
