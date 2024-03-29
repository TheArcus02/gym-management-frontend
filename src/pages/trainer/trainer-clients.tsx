import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import { ClientCardContent } from '../client/client'
import { useGetTrainer, useUnassignClient } from '@/hooks/use-trainer'

const TrainerClients = () => {
  const params = useParams()

  const {
    data: trainer,
    isLoading,
    isError,
  } = useGetTrainer(Number(params.id))

  const { mutate: unassignClient } = useUnassignClient()

  const canDisplay = !isLoading && !isError && trainer

  return (
    <SectionWrapper
      title='Trainer Clients'
      isLoading={!canDisplay}
      isError={isError}
      buttonProps={{
        title: 'Assign Client',
        link: `/trainer/${trainer?.id}/clients/assign`,
      }}
    >
      {canDisplay &&
        trainer.clients.map((client) => (
          <ObjectCard
            key={client.id}
            title={client.name + ' ' + client.surname}
            description={client.email}
            content={<ClientCardContent client={client} />}
            footer={
              <Button
                variant='destructive'
                size='sm'
                onClick={() =>
                  unassignClient({
                    clientId: client.id,
                    trainerId: trainer.id,
                  })
                }
              >
                Unassign
              </Button>
            }
          />
        ))}
    </SectionWrapper>
  )
}

export default TrainerClients
