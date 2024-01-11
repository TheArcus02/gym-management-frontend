import axios from 'axios'
import { useQuery } from 'react-query'

const useTraining = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: ['training', id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL || ''}/api/training/${id}`,
      )
      return data as Training
    },
  })
}

export default useTraining
