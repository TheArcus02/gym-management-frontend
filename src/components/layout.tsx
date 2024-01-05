import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/sidebar'
import { Separator } from '@/components/ui/separator'

const Layout = () => {
  return (
    <div className='flex h-screen max-h-screen'>
      <Sidebar />
      <div>
        <Separator orientation='vertical' />
      </div>

      <main className='w-full'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
