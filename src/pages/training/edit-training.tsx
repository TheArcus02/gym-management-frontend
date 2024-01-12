import FormWrapper from '@/components/form-wrapper'
import TrainingForm from '@/components/forms/training-form'
import Loader from '@/components/loader'
import useGetById from '@/hooks/use-get-by-id'
import { useParams } from 'react-router-dom'

const EditTraining = () => {
  const params = useParams()

  const {
    data: training,
    isLoading,
    isError,
  } = useGetById<Training>({
    queryKey: ['training', Number(params.id)],
    url: `/api/training/${params.id}`,
    errorMessage: 'Error fetching training',
    id: Number(params.id),
  })

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
