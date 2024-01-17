import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import { ExerciseCardContent } from '../exercise/exercise'
import {
  useAssignExercise,
  useGetTraining,
  useUnassignExercise,
} from '@/hooks/use-training'
import { useGetExercises } from '@/hooks/use-exercise'

const AssignExercise = () => {
  const params = useParams()

  const { data: exercises, isLoading, isError } = useGetExercises()

  const { data: training } = useGetTraining(Number(params.id))

  const { mutate: assignExercise } = useAssignExercise()

  const { mutate: unassignExercise } = useUnassignExercise()

  const canDisplay = !isLoading && !isError && training && exercises

  return (
    <SectionWrapper title='Assign Equipment' isLoading={!canDisplay}>
      {canDisplay &&
        exercises.map((exercise) => (
          <ObjectCard
            key={exercise.id}
            title={exercise.name}
            content={<ExerciseCardContent exercise={exercise} />}
            footer={
              training.exercises.find((e) => e.id === exercise.id) ? (
                <>
                  <Button disabled>Assigned</Button>
                  <Button
                    onClick={() =>
                      unassignExercise({
                        exerciseId: exercise.id,
                        trainingId: training.id,
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
                    assignExercise({
                      exerciseId: exercise.id,
                      trainingId: training.id,
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

export default AssignExercise
