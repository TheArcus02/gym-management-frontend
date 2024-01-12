import Loader from '@/components/loader'
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
    <div className='w-full h-full flex flex-col'>
      <div className=' flex justify-between items-center'>
        <h2 className='text-xl font-bold py-5 pl-3'>
          {trainer?.name}'s {trainer?.surname} Clients
        </h2>
        {canDisplay && (
          <Link to={`/trainer/${trainer.id}/clients/assign`}>
            <Button size='sm' className='mr-3'>
              Assign Client
            </Button>
          </Link>
        )}
      </div>
      <Separator />
      {canDisplay ? (
        <ScrollArea className='flex-1'>
          <div className='p-4 flex flex-wrap w-full gap-5'>
            {trainer.clients.map((client) => (
              <Card key={client.id} className='max-w-[350px] w-full'>
                <CardHeader>
                  <CardTitle>
                    {client.name} {client.surname}
                  </CardTitle>
                  <CardDescription>{client.email}</CardDescription>
                </CardHeader>
                <CardFooter className='flex justify-between'>
                  <Link to={``}>
                    <Button variant='outline'>Edit</Button>
                  </Link>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => removeClient(client.id)}
                  >
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default TrainerClients
