import axios from 'axios'
import { useQuery } from 'react-query'
import { toast } from 'sonner'

const useTrainer = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: ['trainer', id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL || ''}/api/trainer/${id}`,
      )
      return data as Trainer
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error fetching trainer')
    },
  })
}

export default useTrainer
