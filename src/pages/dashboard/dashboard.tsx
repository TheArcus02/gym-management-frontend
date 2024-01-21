import ClientCard from './components/client-card'
import EquipmentCard from './components/equipment-card'
import ExerciseCard from './components/exercise-card'
import TrainerCard from './components/trainer-card'
import TrainingCard from './components/training-card'
import WorkoutPlanCard from './components/workout-plan-card'

const Dashboard = () => {
  return (
    <div className='h-full grid grid-cols-1 md:grid-cols-3 gap-4 p-4 max-w-[1500px] mx-auto items-center'>
      <TrainerCard />
      <ClientCard />
      <WorkoutPlanCard />
      <TrainingCard />
      <ExerciseCard />
      <EquipmentCard />
    </div>
  )
}

export default Dashboard
