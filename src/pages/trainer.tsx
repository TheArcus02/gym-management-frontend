import { useQuery } from 'react-query'
import axios from 'axios'
import { toast } from 'sonner'

const Trainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['trainer'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL || ''}/api/trainer`,
      )
      return data
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error fetching trainer')
    },
  })

  console.log(data, isLoading, isError)

  return <div>Trainer</div>
}

export default Trainer
