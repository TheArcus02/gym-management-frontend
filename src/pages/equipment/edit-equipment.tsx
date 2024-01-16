import FormWrapper from '@/components/form-wrapper'
import EquipmentForm from '@/components/forms/equipment-form'
import Loader from '@/components/loader'
import { useGetEquipment } from '@/hooks/use-equipment'
import { useParams } from 'react-router-dom'

const EditEquipment = () => {
  const params = useParams()

  const {
    data: equipment,
    isLoading,
    isError,
  } = useGetEquipment(Number(params.id))

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
