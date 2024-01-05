import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout'
import { Toaster } from '@/components/ui/sonner'
import Trainer from './pages/trainer/trainer'
import AddTrainer from './pages/trainer/add-trainer'
import EditTrainer from './pages/trainer/edit-trainer'

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
