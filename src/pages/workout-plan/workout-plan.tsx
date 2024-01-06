import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import useWorkoutPlans from '@/hooks/use-workout-plans'
import axios from 'axios'
import { XOctagon } from 'lucide-react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const DifficultyIndicator = ({
  difficulty,
}: {
  difficulty: Difficulty
}) => {
  switch (difficulty) {
    case 'EASY':
      return <span className='text-green-500'>Easy</span>
    case 'MEDIUM':
      return <span className='text-yellow-500'>Medium</span>
    case 'HARD':
      return <span className='text-red-500'>Hard</span>
  }
}

const WorkoutPlan = () => {
  const { data: workoutPlans, isLoading, isError } = useWorkoutPlans()

  const { mutate: deleteWorkoutPlan } = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/workout-plan/${id}`,
      )
    },
    onSuccess: () => {
      toast.success(`Workout Plan deleted successfully`)
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error deleting workout plan')
    },
  })

  const canDisplay = !isLoading && !isError && workoutPlans
  return (
    <div className='w-full h-full flex flex-col'>
      <div className=' flex justify-between items-center'>
        <h2 className='text-xl font-bold py-5 pl-3'>Workout Plans</h2>
        <Link to='/workout-plan/add'>
          <Button size='sm' className='mr-3'>
            Add Workout Plan
          </Button>
        </Link>
      </div>
      <Separator />
      {!canDisplay ? (
        <Loader />
      ) : (
        <ScrollArea className='flex-1'>
          <div className='p-4 flex flex-wrap w-full gap-5'>
            {workoutPlans.map((workoutPlan) => (
              <Card
                key={workoutPlan.id}
                className='max-w-[350px] w-full'
              >
                <CardHeader>
                  <div className='flex justify-between'>
                    <CardTitle>{workoutPlan.name}</CardTitle>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() =>
                        deleteWorkoutPlan(workoutPlan.id)
                      }
                    >
                      <XOctagon />
                    </Button>
                  </div>
                  <CardDescription>
                    <DifficultyIndicator
                      difficulty={workoutPlan.difficulty}
                    />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{workoutPlan.description}</p>
                </CardContent>
                <CardFooter className='flex justify-between'>
                  <Link to={`/workout-plan/${workoutPlan.id}`}>
                    <Button variant='outline'>Edit</Button>
                  </Link>
                  <Link
                    to={`/workout-plan/${workoutPlan.id}/trainings`}
                  >
                    <Button size='sm'>Manage Trainings</Button>
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

export default WorkoutPlan
