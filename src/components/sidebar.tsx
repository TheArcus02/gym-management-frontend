import Nav from './nav'
import { Dumbbell, LayoutDashboard, User, Weight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const Sidebar = () => {
  return (
    <aside className='h-full items-stretch max-w-[200px]'>
      <h1 className='text-xl font-bold text-center py-3 px-3'>
        Gym Management
      </h1>
      <Separator />
      <Nav
        links={[
          {
            title: 'Dashboard',
            link: '/',
            label: '',
            icon: LayoutDashboard,
          },
          {
            title: 'Trainer',
            link: '/trainer',
            label: '',
            icon: Dumbbell,
          },
          {
            title: 'Client',
            link: '/client',
            label: '',
            icon: User,
          },
          {
            title: 'Workout Plan',
            link: '/workout-plan',
            label: '',
            icon: Weight,
          },
        ]}
      />
    </aside>
  )
}

export default Sidebar
