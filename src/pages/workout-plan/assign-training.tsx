import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import { useGetTrainings } from '@/hooks/use-training'
import {
  useAssignTraining,
  useGetWorkoutPlan,
  useUnassignTraining,
} from '@/hooks/use-workout-plan'
import { TrainingCardContent } from '../training/training'
import useSearch from '@/hooks/use-search'
import SearchInput from '@/components/search-input'
import { useEffect } from 'react'

const AssignTraining = () => {
  const [search, setSearch] = useSearch()
  const params = useParams()

  const {
    data: trainings,
    isLoading,
    isError,
    refetch,
  } = useGetTrainings({
    search,
  })

  const { data: workoutPlan } = useGetWorkoutPlan(Number(params.id))

  const { mutate: assignTraining } = useAssignTraining()

  const { mutate: unassignTraining } = useUnassignTraining()

  const canDisplay =
    !isLoading && !isError && workoutPlan && trainings

  useEffect(() => {
    refetch()
  }, [search, refetch])

  return (
    <SectionWrapper title='Assign Trainings' isLoading={!canDisplay}>
      <SearchInput
        placeholder='Search for a training'
        handleInputChange={(e) => setSearch(e.target.value)}
      />
      {canDisplay &&
        trainings.map((training) => (
          <ObjectCard
            key={training.id}
            title={training.name}
            content={<TrainingCardContent training={training} />}
            footer={
              workoutPlan.trainings.find(
                (e) => e.id === training.id,
              ) ? (
                <>
                  <Button disabled>Assigned</Button>
                  <Button
                    onClick={() =>
                      unassignTraining({
                        workoutPlanId: workoutPlan.id,
                        trainingId: workoutPlan.id,
                      })
                    }
                    variant='destructive'
                  >
                    Unassign
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() =>
                    assignTraining({
                      workoutPlanId: workoutPlan.id,
                      trainingId: workoutPlan.id,
                    })
                  }
                >
                  Assign
                </Button>
              )
            }
          />
        ))}
    </SectionWrapper>
  )
}

export default AssignTraining
