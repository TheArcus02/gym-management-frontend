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

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<h2>Dashboard</h2>} />
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
          </Route>
          <Route path='/workout-plan'>
            <Route index element={<WorkoutPlan />} />
            <Route path='add' element={<AddWorkoutPlan />} />
            <Route path=':id' element={<EditWorkoutPlan />} />
          </Route>
        </Route>
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
      <Toaster />
    </>
  )
}
