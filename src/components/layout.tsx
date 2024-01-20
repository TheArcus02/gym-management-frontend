import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/sidebar'
import { Separator } from '@/components/ui/separator'
import MobileNav from './mobile-nav'

const Layout = () => {
  return (
    <div className='flex h-screen max-h-screen'>
      <MobileNav />
      <Sidebar className='hidden md:block' />
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
