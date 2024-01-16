import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import useDelete from '@/hooks/use-delete'
import useGetAll from '@/hooks/use-get-all'
import { Link } from 'react-router-dom'

export const TrainingCardContent = ({
  training,
}: {
  training: Training
}) => {
  return <p>Exercises count: {training.exercises.length}</p>
}

const Training = () => {
  const {
    data: trainings,
    isLoading,
    isError,
  } = useGetAll<Training[]>({
    queryKey: ['trainings'],
    url: '/api/training',
    errorMessage: 'Error fetching trainings',
  })

  const { mutate: deleteTraining } = useDelete({
    url: '/api/training/',
    successMessage: 'Training deleted successfully',
    errorMessage: 'Error deleting training',
    invalidateQueries: ['trainings'],
  })

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
