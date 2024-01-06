import axios from 'axios'
import { useQuery } from 'react-query'
import { toast } from 'sonner'

const useClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL || ''}/api/client`,
      )
      return data as Client[]
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error fetching clients')
    },
  })
}

export default useClients
