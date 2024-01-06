import axios from 'axios'
import { useQuery } from 'react-query'
import { toast } from 'sonner'

const useClient = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: ['client', id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL || ''}/api/client/${id},
        )}`,
      )
      return data as Client
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error fetching client')
    },
  })
}

export default useClient
