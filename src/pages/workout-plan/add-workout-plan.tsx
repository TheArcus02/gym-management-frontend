import FormWrapper from '@/components/form-wrapper'
import WorkoutPlanForm from '@/components/forms/workout-plan-form'

const AddWorkoutPlan = () => {
  return (
    <FormWrapper
      title='Add Workout Plan'
      description='Add a new Workout Plan'
      form={<WorkoutPlanForm />}
    />
  )
}

export default AddWorkoutPlan
