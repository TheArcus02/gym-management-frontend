import FormWrapper from '@/components/form-wrapper'
import ClientForm from '@/components/forms/clientForm'
import Loader from '@/components/loader'
import useClient from '@/hooks/use-client'
import { useParams } from 'react-router-dom'

const EditClient = () => {
  const params = useParams()

  const {
    data: client,
    isLoading,
    isError,
  } = useClient({ id: Number(params.id) })

  const canDisplay = !isLoading && !isError && client

  return canDisplay ? (
    <FormWrapper
      title='Add Client'
      description='Add new client to the gym'
      form={<ClientForm client={client} />}
    />
  ) : (
    <Loader />
  )
}

export default EditClient
