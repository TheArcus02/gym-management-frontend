import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useMutation, useQueryClient } from 'react-query'
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

import useGetAll from '@/hooks/use-get-all'
import useGetById from '@/hooks/use-get-by-id'
import SectionWrapper from '@/components/section-wrapper'
import ObjectCard from '@/components/object-card'

const AssignTrainer = () => {
  const params = useParams()
  const queryClient = useQueryClient()

  const {
    data: trainers,
    isLoading: isTrainersLoading,
    isError: isTrainersError,
  } = useGetAll<Trainer[]>({
    queryKey: ['trainers'],
    url: '/api/trainer',
    errorMessage: 'Error fetching trainers',
  })

  const {
    data: client,
    isLoading: isClientLoading,
    isError: isClientError,
  } = useGetById<Client>({
    queryKey: ['client', Number(params.id)],
    url: `/api/client/${params.id}`,
    errorMessage: 'Error fetching client',
    id: Number(params.id),
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

  const canDisplay =
    !isClientLoading &&
    !isTrainersLoading &&
    !isClientError &&
    !isTrainersError &&
    trainers &&
    client
  return (
    <SectionWrapper
      title='Assign Trainer to Client'
      isLoading={!canDisplay}
    >
      {canDisplay &&
        trainers.map((trainer) => (
          <ObjectCard
            key={trainer.id}
            title={trainer.name + ' ' + trainer.surname}
            content={
              <>
                <p>Salary: ${trainer.salary}</p>
                <p>Clients: {trainer.clients.length}</p>
              </>
            }
            footer={
              <>
                {client.trainerId === trainer.id ? (
                  <Button disabled>Assigned</Button>
                ) : (
                  <Button onClick={() => assignTrainer(trainer.id)}>
                    Assign
                  </Button>
                )}
              </>
            }
          />
        ))}
    </SectionWrapper>
  )
}

export default AssignTrainer
