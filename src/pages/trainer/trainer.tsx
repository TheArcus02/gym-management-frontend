import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import SectionWrapper from '@/components/section-wrapper'
import ObjectCard from '@/components/object-card'
import { useDeleteTrainer, useGetTrainers } from '@/hooks/use-trainer'

const TrainerCardContent = ({
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
  const { data: trainers, isLoading, isError } = useGetTrainers()

  const { mutate: deleteTrainer } = useDeleteTrainer()

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
            content={<TrainerCardContent trainer={trainer} />}
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
