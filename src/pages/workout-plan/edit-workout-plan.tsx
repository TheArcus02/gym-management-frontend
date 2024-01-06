import FormWrapper from '@/components/form-wrapper'
import WorkoutPlanForm from '@/components/forms/workout-plan-form'
import Loader from '@/components/loader'
import useWorkoutPlan from '@/hooks/use-workout-plan'
import { useParams } from 'react-router-dom'

const EditWorkoutPlan = () => {
  const params = useParams()

  const {
    data: workoutPlan,
    isLoading,
    isError,
  } = useWorkoutPlan({ id: Number(params.id) })

  const canDisplay = !isLoading && !isError && workoutPlan

  return canDisplay ? (
    <FormWrapper
      title='Edit Workout Plan'
      description='Edit Workout Plan details'
      form={<WorkoutPlanForm workoutPlan={workoutPlan} />}
    />
  ) : (
    <Loader />
  )
}

export default EditWorkoutPlan
