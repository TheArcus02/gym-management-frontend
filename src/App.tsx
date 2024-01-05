import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout'
import { Toaster } from '@/components/ui/sonner'
import Trainer from './pages/trainer/trainer'
import AddTrainer from './pages/trainer/add-trainer'
import EditTrainer from './pages/trainer/edit-trainer'
import TrainerClients from './pages/trainer/trainer-clients'
import AssignClient from './pages/trainer/assign-client'

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
          <Route path='/client' element={<h2>Client</h2>} />
          <Route
            path='/workout-plan'
            element={<h2>Workout Plan</h2>}
          />
        </Route>
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
      <Toaster />
    </>
  )
}
