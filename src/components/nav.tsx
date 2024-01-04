import { cn } from '@/utils'
import { LucideIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'

interface NavProps {
  links: {
    title: string
    link: string
    label: string
    icon: LucideIcon
  }[]
}

const Nav = ({ links }: NavProps) => {
  const location = useLocation()

  return (
    <div className='group flex flex-col gap-4 py-2'>
      <nav className='grid gap-1 px-2'>
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.link}
            className={cn(
              buttonVariants({
                variant:
                  link.link === location.pathname
                    ? 'default'
                    : 'ghost',
                size: 'sm',
              }),
              link.link === location.pathname &&
                'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
              'justify-start',
            )}
          >
            <link.icon className='mr-2 h-4 w-4' />
            {link.title}
            {link.label && (
              <span
                className={cn(
                  'ml-auto',
                  link.link === location.pathname &&
                    'text-background dark:text-white',
                )}
              >
                {link.label}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Nav
