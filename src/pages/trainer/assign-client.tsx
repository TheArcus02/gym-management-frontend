import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import axios from 'axios'
import { Loader } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, useParams } from 'react-router-dom'
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

      return (data as Client[]).filter((client) => !client.trainer)
    },
  })

  const { mutate: assignClient } = useMutation({
    mutationKey: [params.id],
    mutationFn: async (clientId: number) => {
      const { data } = await axios.put(
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
  console.log(clients)
  return (
    <div className='w-full h-full flex flex-col'>
      <div className=' flex justify-between items-center'>
        <h2 className='text-xl font-bold py-5 pl-3'>
          Clients ready to be assigned
        </h2>
      </div>
      <Separator />
      {canDisplay ? (
        <ScrollArea className='flex-1'>
          <div className='p-4 flex flex-wrap w-full gap-5'>
            {clients.map((client) => (
              <Card
                key={client.id + client.email}
                className='max-w-[350px] w-full'
              >
                <CardHeader>
                  <CardTitle>
                    {client.name} {client.surname}
                  </CardTitle>
                  <CardDescription>{client.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>weight: {client.weight} kg</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => assignClient(client.id)}>
                    Assign
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

export default AssignClient
