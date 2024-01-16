import FormWrapper from '@/components/form-wrapper'
import TrainingForm from '@/components/forms/training-form'
import Loader from '@/components/loader'
import useGetById from '@/hooks/use-get-by-id'
import { useGetTraining } from '@/hooks/use-training'
import { useParams } from 'react-router-dom'

const EditTraining = () => {
  const params = useParams()

  const {
    data: training,
    isLoading,
    isError,
  } = useGetTraining(Number(params.id))

  const canDisplay = !isLoading && !isError && training

  return canDisplay ? (
    <FormWrapper
      title='Edit Training'
      description='Edit training details'
      form={<TrainingForm training={training} />}
    />
  ) : (
    <Loader />
  )
}

export default EditTraining
