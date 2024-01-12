import FormWrapper from '@/components/form-wrapper'
import EquipmentForm from '@/components/forms/equipment-form'

const AddEquipment = () => {
  return (
    <FormWrapper
      title='Add Equipment'
      description='Add a new equipment to the gym'
      form={<EquipmentForm />}
    />
  )
}

export default AddEquipment
