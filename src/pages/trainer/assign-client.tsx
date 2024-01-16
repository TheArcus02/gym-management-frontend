import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import { useAssignClient } from '@/hooks/use-trainer'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const AssignClient = () => {
  const params = useParams()

  const {
    data: clients,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['free_clients'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL || ''}/api/client`,
      )

      return (data as Client[]).filter((client) => !client.trainerId)
    },
  })

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
