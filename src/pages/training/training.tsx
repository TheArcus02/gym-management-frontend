import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import {
  useDeleteTraining,
  useGetTrainings,
} from '@/hooks/use-training'
import { Link } from 'react-router-dom'

export const TrainingCardContent = ({
  training,
}: {
  training: Training
}) => {
  return <p>Exercises count: {training.exercises.length}</p>
}

const Training = () => {
  const { data: trainings, isLoading, isError } = useGetTrainings()

  const { mutate: deleteTraining } = useDeleteTraining()

  const canDisplay = !isLoading && !isError && trainings

  return (
    <SectionWrapper
      title='Trainings'
      isLoading={!canDisplay}
      buttonProps={{
        title: 'Add Training',
        link: '/training/add',
      }}
    >
      {canDisplay &&
        trainings.map((training) => (
          <ObjectCard
            key={training.id}
            title={training.name}
            description={training.description}
            content={<TrainingCardContent training={training} />}
            footer={
              <>
                <Link to={`/training/${training.id}`}>
                  <Button variant='outline'>Edit</Button>
                </Link>
                <Link to={`/training/${training.id}/exercise`}>
                  <Button size='sm'>Assign Exercises</Button>
                </Link>
              </>
            }
            deleteFunction={() => deleteTraining(training.id)}
          />
        ))}
    </SectionWrapper>
  )
}

export default Training
