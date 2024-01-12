import Nav from './nav'
import {
  Dumbbell,
  LayoutDashboard,
  User,
  Weight,
  NotebookPen,
  NotebookText,
  Anvil,
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const Sidebar = () => {
  return (
    <aside className='h-full w-full items-stretch max-w-[250px]'>
      <h1 className='text-xl font-bold text-center py-5 px-3 flex items-center justify-center'>
        <Dumbbell className='mr-2' size={24} />
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
            icon: NotebookText,
          },
          {
            title: 'Training',
            link: '/training',
            label: '',
            icon: NotebookPen,
          },
          {
            title: 'Exercise',
            link: '/exercise',
            label: '',
            icon: Weight,
          },
          {
            title: 'Equipment',
            link: '/equipment',
            label: '',
            icon: Anvil,
          },
        ]}
      />
    </aside>
  )
}

export default Sidebar
