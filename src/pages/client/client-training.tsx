import Loader from '@/components/loader'
import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import {
  useGetClient,
  useStartTrainingClient,
  useStopTrainingClient,
} from '@/hooks/use-client'
import { useGetTraining } from '@/hooks/use-training'
import { useParams } from 'react-router-dom'
import { ExerciseCardContent } from '../exercise/exercise'
import { Button } from '@/components/ui/button'

const ClientTraining = () => {
  const params = useParams()

  const {
    data: client,
    isLoading: isClientLoading,
    isError: isClientError,
  } = useGetClient(parseInt(params.clientId!))

  const {
    data: training,
    isLoading: isTrainingLoading,
    isError: isTrainingError,
  } = useGetTraining(parseInt(params.trainingId!))

  const { mutate: startTraining } = useStartTrainingClient()

  const { mutate: stopTraining } = useStopTrainingClient()

  const canDisplay =
    !isClientLoading &&
    !isTrainingLoading &&
    !isClientError &&
    !isTrainingError &&
    client &&
    training

  return canDisplay ? (
    <SectionWrapper
      title={`Train ${training.name}`}
      isLoading={!canDisplay}
    >
      {training.exercises.map((exercise) => (
        <ObjectCard
          key={exercise.id}
          title={exercise.name}
          content={<ExerciseCardContent exercise={exercise} />}
          footer={
            exercise.equipment.isOccupied ? (
              client?.currentlyTrainedExerciseId === exercise.id ? (
                <Button
                  variant='destructive'
                  onClick={() =>
                    stopTraining({
                      clientId: client.id,
                      exerciseId: exercise.id,
                      trainingId: training.id,
                    })
                  }
                >
                  Finish Exercise
                </Button>
              ) : (
                <Button disabled>Currently Occupied</Button>
              )
            ) : (
              <Button
                onClick={() =>
                  startTraining({
                    clientId: client.id,
                    exerciseId: exercise.id,
                    trainingId: training.id,
                  })
                }
              >
                Start Exercise
              </Button>
            )
          }
        />
      ))}
    </SectionWrapper>
  ) : (
    <Loader />
  )
}

export default ClientTraining
