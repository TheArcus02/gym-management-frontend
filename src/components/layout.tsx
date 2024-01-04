import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/sidebar'
import { Separator } from '@/components/ui/separator'

const Layout = () => {
  return (
    <div className='flex min-h-screen h-full'>
      <Sidebar />
      <div>
        <Separator orientation='vertical' />
      </div>
      <Outlet />
    </div>
  )
}

export default Layout
