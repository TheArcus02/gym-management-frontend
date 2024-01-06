import axios from 'axios'
import { useQuery } from 'react-query'
import { toast } from 'sonner'

const useWorkoutPlans = () => {
  return useQuery({
    queryKey: 'workoutPlans',
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL || ''}/api/workout-plan`,
      )
      return data as WorkoutPlan[]
    },
    onError: (error) => {
      console.log(error)
      toast.error('Error fetching workout plans')
    },
  })
}

export default useWorkoutPlans
