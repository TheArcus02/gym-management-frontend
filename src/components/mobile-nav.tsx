import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import Sidebar from './sidebar'

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger className='md:hidden px-4'>
        <Menu />
      </SheetTrigger>
      <SheetContent side='left'>
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
