import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout'
import { Toaster } from '@/components/ui/sonner'
import Trainer from './pages/trainer/trainer'
import AddTrainer from './pages/trainer/add-trainer'
import EditTrainer from './pages/trainer/edit-trainer'
import TrainerClients from './pages/trainer/trainer-clients'
import AssignClient from './pages/trainer/assign-client'
import Client from './pages/client/client'
import AddClient from './pages/client/add-client'
import EditClient from './pages/client/edit-client'
import AssignTrainer from './pages/client/assign-trainer'
import AssignWorkoutPlan from './pages/client/assign-workout-plan'
import WorkoutPlan from './pages/workout-plan/workout-plan'
import AddWorkoutPlan from './pages/workout-plan/add-workout-plan'
import EditWorkoutPlan from './pages/workout-plan/edit-workout-plan'
import Training from './pages/training/training'
import AddTraining from './pages/training/add-training'
import EditTraining from './pages/training/edit-training'
import AssignExercise from './pages/training/assign-exercise'
import Exercise from './pages/exercise/exercise'
import AddExercise from './pages/exercise/add-exercise'
import EditExercise from './pages/exercise/edit-exercise'
import AssignEquipment from './pages/exercise/assign-equipment'
import Equipment from './pages/equipment/equipment'
import AddEquipment from './pages/equipment/add-equipment'
import EditEquipment from './pages/equipment/edit-equipment'
import AssignTraining from './pages/workout-plan/assign-training'
import Dashboard from './pages/dashboard/dashboard'
import ChooseTraining from './pages/client/choose-training'
import ClientTraining from './pages/client/client-training'

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='/trainer'>
            <Route index element={<Trainer />} />
            <Route path='add' element={<AddTrainer />} />
            <Route path=':id' element={<EditTrainer />} />
            <Route path=':id/clients' element={<TrainerClients />} />
            <Route
              path=':id/clients/assign'
              element={<AssignClient />}
            />
          </Route>
          <Route path='/client'>
            <Route index element={<Client />} />
            <Route path='add' element={<AddClient />} />
            <Route path=':id' element={<EditClient />} />
            <Route path=':id/trainer' element={<AssignTrainer />} />
            <Route
              path=':id/workout-plan'
              element={<AssignWorkoutPlan />}
            />
            <Route path=':id/training' element={<ChooseTraining />} />
            <Route
              path=':clientId/training/:trainingId'
              element={<ClientTraining />}
            />
          </Route>
          <Route path='/workout-plan'>
            <Route index element={<WorkoutPlan />} />
            <Route path='add' element={<AddWorkoutPlan />} />
            <Route path=':id' element={<EditWorkoutPlan />} />
            <Route path=':id/training' element={<AssignTraining />} />
          </Route>
          <Route path='/training'>
            <Route index element={<Training />} />
            <Route path='add' element={<AddTraining />} />
            <Route path=':id' element={<EditTraining />} />
            <Route path=':id/exercise' element={<AssignExercise />} />
          </Route>
          <Route path='/exercise'>
            <Route index element={<Exercise />} />
            <Route path='add' element={<AddExercise />} />
            <Route path=':id' element={<EditExercise />} />
            <Route
              path=':id/equipment'
              element={<AssignEquipment />}
            />
          </Route>
          <Route path='/equipment'>
            <Route index element={<Equipment />} />
            <Route path='add' element={<AddEquipment />} />
            <Route path=':id' element={<EditEquipment />} />
          </Route>
        </Route>
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
      <Toaster />
    </>
  )
}
