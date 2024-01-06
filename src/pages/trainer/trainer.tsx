import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import Loader from '@/components/loader'
import { XOctagon } from 'lucide-react'
import useTrainers from '@/hooks/use-trainers'
import { ScrollArea } from '@/components/ui/scroll-area'

const Trainer = () => {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useTrainers()

  const { mutate: deleteTrainer } = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL || ''}/api/trainer/${id}`,
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries('trainers')
      toast.success(`Trainer deleted successfully`)
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error deleting trainer')
    },
  })

  const canDisplay = !isLoading && !isError && data
  return (
    <div className='w-full h-full flex flex-col'>
      <div className=' flex justify-between items-center'>
        <h2 className='text-xl font-bold py-5 pl-3'>Trainers</h2>
        <Link to='/trainer/add'>
          <Button size='sm' className='mr-3'>
            Add Trainer
          </Button>
        </Link>
      </div>
      <Separator />
      {!canDisplay ? (
        <Loader />
      ) : (
        <ScrollArea className='flex-1'>
          <div className='p-4 flex flex-wrap w-full gap-5'>
            {data.map((trainer) => (
              <Card key={trainer.id} className='max-w-[350px] w-full'>
                <CardHeader>
                  <div className='flex justify-between'>
                    <CardTitle>
                      {trainer.name} {trainer.surname}
                    </CardTitle>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => deleteTrainer(trainer.id)}
                    >
                      <XOctagon />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Salary: ${trainer.salary}</p>
                  <p>Clients: {trainer.clients.length}</p>
                </CardContent>
                <CardFooter className='flex justify-between'>
                  <Link to={`/trainer/${trainer.id}`}>
                    <Button variant='outline'>Edit</Button>
                  </Link>
                  <Link to={`/trainer/${trainer.id}/clients`}>
                    <Button size='sm'>Show Clients</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}

export default Trainer
