import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import useGetAll from '@/hooks/use-get-all'
import useDelete from '@/hooks/use-delete'
import SectionWrapper from '@/components/section-wrapper'
import ObjectCard from '@/components/object-card'

const Trainer = () => {
  const {
    data: trainers,
    isLoading,
    isError,
  } = useGetAll<Trainer[]>({
    queryKey: ['trainers'],
    url: '/api/trainer',
    errorMessage: 'Error fetching trainers',
  })

  const { mutate: deleteTrainer } = useDelete({
    url: '/api/trainer',
    successMessage: 'Trainer deleted successfully',
    errorMessage: 'Error deleting trainer',
    invalidateQueries: ['trainers'],
  })

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
      {canDisplay &&
        trainers.map((trainer) => (
          <ObjectCard
            key={trainer.id}
            title={trainer.name + ' ' + trainer.surname}
            content={
              <>
                <p>Salary: ${trainer.salary}</p>
                <p>Clients: {trainer.clients.length}</p>
              </>
            }
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
