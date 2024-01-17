import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import { useGetFreeClients } from '@/hooks/use-client'
import { useAssignClient } from '@/hooks/use-trainer'
import { useParams } from 'react-router-dom'

const AssignClient = () => {
  const params = useParams()

  const { data: clients, isLoading, isError } = useGetFreeClients()

  const { mutate: assignClient } = useAssignClient()

  const canDisplay = !isLoading && !isError && clients

  return (
    <SectionWrapper
      title='Clients ready to be assigned'
      isLoading={!canDisplay}
    >
      {canDisplay &&
        clients.map((client) => (
          <ObjectCard
            key={client.id}
            title={client.name + ' ' + client.surname}
            description={client.email}
            content={<p>Weight: {client.weight} kg</p>}
            footer={
              <>
                <Button
                  onClick={() =>
                    assignClient({
                      clientId: client.id,
                      trainerId: parseInt(params.id!),
                    })
                  }
                >
                  Assign
                </Button>
              </>
            }
          />
        ))}
    </SectionWrapper>
  )
}

export default AssignClient
