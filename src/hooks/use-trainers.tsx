import axios from 'axios'
import { useQuery } from 'react-query'
import { toast } from 'sonner'

const useTrainers = () => {
  return useQuery({
    queryKey: ['trainers'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL || ''}/api/trainer`,
      )
      return data as Trainer[]
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error fetching trainers')
    },
  })
}

export default useTrainers
