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

const AssignWorkoutPlan = () => {
  const params = useParams()

  const {
    data: workoutPlans,
    isLoading: isWorkoutPlansLoading,
    isError: isWorkoutPlansError,
  } = useGetWorkoutPlans({})

  const {
    data: client,
    isLoading: isClientLoading,
    isError: isClientError,
  } = useGetClient(parseInt(params.id!))

  const { mutate: assignWorkoutPlan } = useAssignWorkoutPlan()

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
