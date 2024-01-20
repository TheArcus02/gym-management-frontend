import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import SectionWrapper from '@/components/section-wrapper'
import ObjectCard from '@/components/object-card'
import {
  useAssignWorkoutPlan,
  useGetClient,
} from '@/hooks/use-client'
import { useGetWorkoutPlans } from '@/hooks/use-workout-plan'
import { WorkoutPlanCardContent } from '../workout-plan/workout-plan'
import useSearch from '@/hooks/use-search'
import { useEffect } from 'react'
import SearchInput from '@/components/search-input'

const AssignWorkoutPlan = () => {
  const [search, setSearch] = useSearch()
  const params = useParams()

  const {
    data: workoutPlans,
    isLoading: isWorkoutPlansLoading,
    isError: isWorkoutPlansError,
    refetch,
  } = useGetWorkoutPlans({
    search,
  })

  const {
    data: client,
    isLoading: isClientLoading,
    isError: isClientError,
  } = useGetClient(parseInt(params.id!))

  const { mutate: assignWorkoutPlan } = useAssignWorkoutPlan()

  useEffect(() => {
    refetch()
  }, [refetch, search])

  const canDisplay =
    !isClientLoading &&
    !isWorkoutPlansLoading &&
    !isClientError &&
    !isWorkoutPlansError &&
    workoutPlans &&
    client
  return (
    <SectionWrapper
      title='Assign Trainer to Client'
      isLoading={!canDisplay}
    >
      <SearchInput
        placeholder='Search for a workout plan'
        handleInputChange={(e) => setSearch(e.target.value)}
      />
      {canDisplay &&
        workoutPlans.map((workoutPlan) => (
          <ObjectCard
            key={workoutPlan.id}
            title={workoutPlan.name}
            content={
              <WorkoutPlanCardContent workoutPlan={workoutPlan} />
            }
            footer={
              <>
                {client?.workoutPlan?.id === workoutPlan.id ? (
                  <Button disabled>Assigned</Button>
                ) : (
                  <Button
                    onClick={() =>
                      assignWorkoutPlan({
                        clientId: client.id,
                        workoutPlanId: workoutPlan.id,
                      })
                    }
                  >
                    Assign
                  </Button>
                )}
              </>
            }
          />
        ))}
    </SectionWrapper>
  )
}

export default AssignWorkoutPlan
