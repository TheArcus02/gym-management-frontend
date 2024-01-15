import Loader from '@/components/loader'
import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import useGetById from '@/hooks/use-get-by-id'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const TrainerClients = () => {
  const params = useParams()
  const queryClient = useQueryClient()

  const {
    data: trainer,
    isLoading,
    isError,
  } = useGetById<Trainer>({
    queryKey: ['trainer', Number(params.id)],
    url: `/api/trainer/${params.id}`,
    errorMessage: 'Error fetching trainer',
    id: Number(params.id),
  })

  const { mutate: removeClient } = useMutation({
    mutationFn: async (clientId: number) => {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/client/${clientId}/trainer`,
        {},
      )
      return data as Client
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['trainer', 'trainers'])
      toast.success(`Client removed successfully`)
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error removing client')
    },
  })

  const canDisplay = !isLoading && !isError && trainer

  return (
    <SectionWrapper
      title='Trainer Clients'
      isLoading={!canDisplay}
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
            footer={
              <Button
                variant='destructive'
                size='sm'
                onClick={() => removeClient(client.id)}
              >
                Remove
              </Button>
            }
          />
        ))}
    </SectionWrapper>
  )
}

export default TrainerClients
