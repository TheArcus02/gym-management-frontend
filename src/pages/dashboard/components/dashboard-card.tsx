import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

interface DashboardCardProps {
  title: string
  Icon: LucideIcon
  content: React.ReactNode
  link: string
}

const DashboardCard = ({
  title,
  Icon,
  content,
  link,
}: DashboardCardProps) => {
  return (
    <Card className='h-full max-h-80 flex flex-col'>
      <CardHeader>
        <CardTitle className='flex itemx-center justify-between'>
          {title}
          <Icon size={20} className='mr-3 text-foreground/60' />
        </CardTitle>
      </CardHeader>
      <CardContent className='flex-1'>{content}</CardContent>
      <CardFooter>
        <Link to={link} className='w-full'>
          <Button className='w-full'>View All</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default DashboardCard
