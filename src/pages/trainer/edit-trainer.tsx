import FormWrapper from '@/components/form-wrapper'
import TrainerForm from '@/components/forms/trainer-form'
import Loader from '@/components/loader'
import { useGetTrainer } from '@/hooks/use-trainer'
import { useParams } from 'react-router-dom'

const EditTrainer = () => {
  const params = useParams()

  const {
    data: trainer,
    isLoading,
    isError,
  } = useGetTrainer(Number(params.id))

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
