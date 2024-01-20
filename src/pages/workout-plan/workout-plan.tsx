import DifficultyIndicator from '@/components/difficulty-indicator'
import ObjectCard from '@/components/object-card'
import SearchInput from '@/components/search-input'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import useSearch from '@/hooks/use-search'
import {
  useDeleteWorkoutPlan,
  useGetWorkoutPlans,
} from '@/hooks/use-workout-plan'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export const WorkoutPlanCardContent = ({
  workoutPlan,
}: {
  workoutPlan: WorkoutPlan
}) => {
  return (
    <>
      <DifficultyIndicator
        difficulty={workoutPlan.difficulty}
        className='mb-4'
      />
      <p>{workoutPlan.description}</p>
      <p>Trainings Count: {workoutPlan.trainings.length}</p>
    </>
  )
}

const WorkoutPlan = () => {
  const [search, setSearch] = useSearch()

  const {
    data: workoutPlans,
    isLoading,
    isError,
    refetch,
  } = useGetWorkoutPlans({
    search: search,
  })

  const { mutate: deleteWorkoutPlan } = useDeleteWorkoutPlan()

  useEffect(() => {
    refetch()
  }, [refetch, search])

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
      <SearchInput
        handleInputChange={(e) => setSearch(e.target.value)}
        placeholder='Search workout plans...'
      />
      {canDisplay &&
        workoutPlans.map((workoutPlan) => (
          <ObjectCard
            key={workoutPlan.id}
            title={workoutPlan.name}
            description={new Date(
              workoutPlan.createdAt,
            ).toLocaleDateString()}
            content={
              <WorkoutPlanCardContent workoutPlan={workoutPlan} />
            }
            footer={
              <>
                <Link to={`/workout-plan/${workoutPlan.id}`}>
                  <Button variant='outline'>Edit</Button>
                </Link>
                <Link to={`/workout-plan/${workoutPlan.id}/training`}>
                  <Button size='sm'>Assign Trainings</Button>
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
