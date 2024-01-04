import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<h1>Dashboard</h1>} />
        <Route path='/trainer' element={<h2>Trainer</h2>} />
        <Route path='/client' element={<h2>Client</h2>} />
        <Route path='/workout-plan' element={<h2>Workout Plan</h2>} />
      </Route>
    </Routes>
  )
}
