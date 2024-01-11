import axios from 'axios'
import { useQuery } from 'react-query'
import { toast } from 'sonner'

const useTrainings = () => {
  return useQuery({
    queryKey: 'trainings',
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL || ''}/api/training`,
      )
      return data as Training[]
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error fetching trainings')
    },
  })
}

export default useTrainings
