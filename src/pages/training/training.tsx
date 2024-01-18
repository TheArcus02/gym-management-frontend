import ObjectCard from '@/components/object-card'
import SearchInput from '@/components/search-input'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import useSearch from '@/hooks/use-search'
import {
  useDeleteTraining,
  useGetTrainings,
} from '@/hooks/use-training'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export const TrainingCardContent = ({
  training,
}: {
  training: Training
}) => {
  return <p>Exercises count: {training.exercises.length}</p>
}

const Training = () => {
  const [search, setSearch] = useSearch()

  const {
    data: trainings,
    isLoading,
    isError,
    refetch,
  } = useGetTrainings({
    search: search,
  })

  const { mutate: deleteTraining } = useDeleteTraining()

  useEffect(() => {
    refetch()
  }, [refetch, search])

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
      <SearchInput
        handleInputChange={(e) => setSearch(e.target.value)}
        placeholder='Search trainings...'
      />
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
