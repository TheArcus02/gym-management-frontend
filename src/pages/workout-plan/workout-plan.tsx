import DifficultyIndicator from '@/components/difficulty-indicator'
import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import {
  useDeleteWorkoutPlan,
  useGetWorkoutPlans,
} from '@/hooks/use-workout-plan'
import { Link } from 'react-router-dom'

const WorkoutPlan = () => {
  const {
    data: workoutPlans,
    isLoading,
    isError,
  } = useGetWorkoutPlans()

  const { mutate: deleteWorkoutPlan } = useDeleteWorkoutPlan()

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
            key={workoutPlan.id}
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
