import FormWrapper from '@/components/form-wrapper'
import EquipmentForm from '@/components/forms/equipment-form'
import Loader from '@/components/loader'
import useGetById from '@/hooks/use-get-by-id'
import { useParams } from 'react-router-dom'

const EditEquipment = () => {
  const params = useParams()

  const {
    data: equipment,
    isLoading,
    isError,
  } = useGetById<Machine | Barbell | Dumbells>({
    queryKey: ['equipment', Number(params.id)],
    url: `/api/equipment/${params.id}`,
    errorMessage: 'Error fetching equipment',
    id: Number(params.id),
  })

  const canDisplay = !isLoading && !isError && equipment

  return canDisplay ? (
    <FormWrapper
      title='Edit Equipment'
      description='Edit equipment details'
      form={<EquipmentForm equipment={equipment} />}
    />
  ) : (
    <Loader />
  )
}

export default EditEquipment
