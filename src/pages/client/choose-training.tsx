import ObjectCard from '@/components/object-card'
import SectionWrapper from '@/components/section-wrapper'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import { useGetClient } from '@/hooks/use-client'
import { Ban } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { TrainingCardContent } from '../training/training'
import { Button } from '@/components/ui/button'

const ChooseTraining = () => {
  const params = useParams()

  const {
    data: client,
    isLoading: isClientLoading,
    isError: isClientError,
  } = useGetClient(parseInt(params.id!))

  const canDisplay = !isClientLoading && !isClientError && client

  return (
    <SectionWrapper title='Choose Training' isLoading={!canDisplay}>
      {canDisplay && client.workoutPlan ? (
        client.workoutPlan?.trainings.map((training) => (
          <ObjectCard
            key={training.id}
            title={training.name}
            content={<TrainingCardContent training={training} />}
            footer={
              <Link
                to={`/client/${client.id}/training/${training.id}`}
              >
                <Button>Choose</Button>
              </Link>
            }
          />
        ))
      ) : (
        <div className='flex items-center justify-center h-full'>
          <Alert className='max-w-3xl'>
            <Ban className='h-4 w-4' />
            <AlertTitle>
              Client don't have assigned workout plan.
            </AlertTitle>
            <AlertDescription>
              Please assign a workout plan to this client.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </SectionWrapper>
  )
}

export default ChooseTraining
