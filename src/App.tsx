import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout'
import { Toaster } from '@/components/ui/sonner'

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<h2>Dashboard</h2>} />
          <Route path='/trainer'>
            <Route index element={<h2>Trainer</h2>} />
            <Route path=':id' element={<h2>Trainer id</h2>} />
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
