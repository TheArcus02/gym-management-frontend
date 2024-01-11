import Loader from '@/components/loader'
import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
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
import { title } from 'process'
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
    <SectionWrapper
      title='Trainings'
      isLoading={!canDisplay}
      buttonProps={{
        title: 'Add Training',
        link: '/training/add',
      }}
    >
      {canDisplay &&
        trainings.map((training) => (
          <ObjectCard
            key={training.id}
            title={training.name}
            description={training.description}
            content={
              <p>Exercises count: {training.exercises.length}</p>
            }
            footer={
              <>
                <Link to={`/training/${training.id}`}>
                  <Button variant='outline'>Edit</Button>
                </Link>
                <Link to={`/training/${training.id}/exercise`}>
                  <Button size='sm'>Manage Exercises</Button>
                </Link>
              </>
            }
            deleteFunction={() => deleteTraining(training.id)}
          />
        ))}
    </SectionWrapper>
  )
}

export default Training
