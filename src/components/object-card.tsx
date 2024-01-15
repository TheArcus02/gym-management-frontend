import { XOctagon } from 'lucide-react'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

interface ObjectCardProps {
  title: string
  deleteFunction?: VoidFunction
  description?: string | React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode
}

const ObjectCard = ({
  title,
  deleteFunction,
  description,
  content,
  footer,
}: ObjectCardProps) => {
  return (
    <Card className='max-w-[350px] w-full'>
      <CardHeader>
        <div className='flex justify-between'>
          <CardTitle>{title}</CardTitle>
          {deleteFunction && (
            <Button
              variant='ghost'
              size='icon'
              onClick={() => deleteFunction()}
            >
              <XOctagon />
            </Button>
          )}
        </div>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      {content && <CardContent>{content}</CardContent>}
      <CardFooter className='flex justify-between'>
        {footer}
      </CardFooter>
    </Card>
  )
}

export default ObjectCard
