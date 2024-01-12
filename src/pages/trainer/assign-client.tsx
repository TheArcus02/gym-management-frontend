import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const AssignClient = () => {
  const params = useParams()
  const queryClient = useQueryClient()

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

  const { mutate: assignClient } = useMutation({
    mutationKey: [params.id],
    mutationFn: async (clientId: number) => {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/client/${clientId}/trainer/${parseInt(params.id!)}`,
        {},
      )
      return data as Client
    },
    onSuccess: () => {
      toast.success(`Client assigned successfully`)
      queryClient.invalidateQueries('free_clients')
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error assigning client')
    },
  })

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
                <Button onClick={() => assignClient(client.id)}>
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
