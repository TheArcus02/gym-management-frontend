import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import SectionWrapper from '@/components/section-wrapper'
import ObjectCard from '@/components/object-card'
import { useDeleteTrainer, useGetTrainers } from '@/hooks/use-trainer'
import { useEffect } from 'react'
import SearchInput from '@/components/search-input'
import useSearch from '@/hooks/use-search'

export const TrainerCardContent = ({
  trainer: trainer,
}: {
  trainer: Trainer
}) => {
  return (
    <>
      <p>Salary: ${trainer.salary}</p>
      <p>Clients: {trainer.clients.length}</p>
    </>
  )
}

const Trainer = () => {
  const [search, setSearch] = useSearch()

  const {
    data: trainers,
    refetch,
    isLoading,
    isError,
  } = useGetTrainers({
    search: search,
  })

  const { mutate: deleteTrainer } = useDeleteTrainer()

  useEffect(() => {
    refetch()
  }, [refetch, search])

  const canDisplay = !isLoading && !isError && trainers

  return (
    <SectionWrapper
      title='Trainers'
      isLoading={!canDisplay}
      buttonProps={{
        title: 'Add Trainer',
        link: '/trainer/add',
      }}
    >
      <SearchInput
        handleInputChange={(e) => setSearch(e.target.value)}
        placeholder='Search trainers...'
      />
      {canDisplay &&
        trainers.map((trainer) => (
          <ObjectCard
            key={trainer.id}
            title={trainer.name + ' ' + trainer.surname}
            content={<TrainerCardContent trainer={trainer} />}
            description={new Date(
              trainer.createdAt,
            ).toLocaleDateString()}
            footer={
              <>
                <Link to={`/trainer/${trainer.id}`}>
                  <Button variant='outline'>Edit</Button>
                </Link>
                <Link to={`/trainer/${trainer.id}/clients`}>
                  <Button size='sm'>Show Clients</Button>
                </Link>
              </>
            }
            deleteFunction={() => deleteTrainer(trainer.id)}
          />
        ))}
    </SectionWrapper>
  )
}

export default Trainer
