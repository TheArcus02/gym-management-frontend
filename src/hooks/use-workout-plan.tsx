import axios from 'axios'
import { useQuery } from 'react-query'

const useWorkoutPlan = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: ['workoutPlan', id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL || ''
        }/api/workout-plan/${id}`,
      )
      return data as WorkoutPlan
    },
  })
}

export default useWorkoutPlan
