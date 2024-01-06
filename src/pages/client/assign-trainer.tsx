import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { toast } from 'sonner'
import Loader from '@/components/loader'
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useParams } from 'react-router-dom'

const AssignTrainer = () => {
  const params = useParams()
  const queryClient = useQueryClient()

  const {
    data: trainers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['trainers'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL || ''}/api/trainer`,
      )
      return data as Trainer[]
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error fetching trainers')
    },
  })

  const { mutate: assignTrainer } = useMutation({
    mutationKey: [params.id],
    mutationFn: async (trainerId: number) => {
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL || ''}/api/client/${parseInt(
          params.id!,
        )}/trainer/${trainerId}`,
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries('trainers')
      toast.success(`Trainer assigned successfully`)
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error assigning trainer')
    },
  })

  const canDisplay = !isLoading && !isError && trainers

  return (
    <div className='w-full h-full flex flex-col'>
      <div className=' flex justify-between items-center'>
        <h2 className='text-xl font-bold py-5 pl-3'>
          Assign Trainer to Client
        </h2>
      </div>
      <Separator />
      {canDisplay ? (
        <ScrollArea className='flex-1'>
          <div className='p-4 flex flex-wrap w-full gap-5'>
            {trainers.map((trainer) => (
              <Card key={trainer.id} className='max-w-[350px] w-full'>
                <CardHeader>
                  <CardTitle>
                    {trainer.name} {trainer.surname}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Salary: ${trainer.salary}</p>
                  <p>Clients: {trainer.clients.length}</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => assignTrainer(trainer.id)}>
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

export default AssignTrainer
