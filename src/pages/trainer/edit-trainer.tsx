import FormWrapper from '@/components/form-wrapper'
import TrainerForm from '@/components/forms/trainerForm'
import Loader from '@/components/loader'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const EditTrainer = () => {
  const params = useParams()

  const {
    data: trainer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['trainer', params.id],
    enabled: !!params.id,
    queryFn: async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/trainer/${parseInt(params.id!)}`,
      )
      return data as Trainer
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error fetching trainer')
    },
  })

  const canDisplay = !isLoading && !isError && trainer

  return canDisplay ? (
    <FormWrapper
      title='Edit Trainer'
      description='Edit trainer details'
      form={<TrainerForm trainer={trainer} />}
    />
  ) : (
    <Loader />
  )
}

export default EditTrainer
