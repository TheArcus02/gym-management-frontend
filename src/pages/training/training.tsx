import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import useTrainings from '@/hooks/use-trainings'
import axios from 'axios'
import { XOctagon } from 'lucide-react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const Training = () => {
  const { data: trainings, isLoading, isError } = useTrainings()

  const { mutate: deleteTraining } = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL || ''}/api/training/${id}`,
      )
    },
    onSuccess: () => {
      toast.success(`Training deleted successfully`)
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error deleting training')
    },
  })

  const canDisplay = !isLoading && !isError && trainings

  return (
    <div className='w-full h-full flex flex-col'>
      <div className=' flex justify-between items-center'>
        <h2 className='text-xl font-bold py-5 pl-3'>Trainings</h2>
        <Link to='/workout-plan/add'>
          <Button size='sm' className='mr-3'>
            Add Training
          </Button>
        </Link>
      </div>
      <Separator />
      {!canDisplay ? (
        <Loader />
      ) : (
        <ScrollArea className='flex-1'>
          <div className='p-4 flex flex-wrap w-full gap-5'>
            {trainings.map((training) => (
              <Card
                key={training.id}
                className='max-w-[350px] w-full'
              >
                <CardHeader>
                  <div className='flex justify-between'>
                    <CardTitle>{training.name}</CardTitle>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => deleteTraining(training.id)}
                    >
                      <XOctagon />
                    </Button>
                  </div>
                  <CardDescription>
                    {training.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Exercises count: {training.exercises.length}</p>
                </CardContent>
                <CardFooter className='flex justify-between'>
                  <Link to={`/training/${training.id}`}>
                    <Button variant='outline'>Edit</Button>
                  </Link>
                  <Link to={`/training/${training.id}/exercises/`}>
                    <Button size='sm'>Assign Exercises</Button>
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

export default Training
