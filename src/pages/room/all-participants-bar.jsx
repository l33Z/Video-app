import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { UsersRound } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonDemo() {
  return (
    <div className='border rounded-md py-3 px-5 flex items-center mt-3'>
      <Skeleton className='h-8 w-8 rounded-full' />
      <div className='space-y-3 ml-3'>
        <Skeleton className='h-3 w-[250px]' />
        <Skeleton className='h-3 w-[200px]' />
      </div>
    </div>
  )
}

const AllParticipantsBar = ({ isOpen, onOpenChange }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger />
      <SheetContent side={'left'}>
        <SheetHeader>
          <SheetTitle>Participants</SheetTitle>
          <div className=''>
            <div className='border rounded-md py-3 px-5 flex items-center mt-3'>
              <div className='w-8 h-8 rounded-full bg-lime-400 text-black flex items-center justify-center'>Z</div>
              <div className='ml-3'>
                <p className='text-md'>
                  Zeel Rabadiya <span className='text-muted-foreground'> (You)</span>{' '}
                </p>
                <p className='text-sm text-muted-foreground'>185952a5d15a151axc18a1c1a5c</p>
              </div>
            </div>

            <div className='border rounded-md py-3 px-5 flex items-center mt-3'>
              <div className='w-8 h-8 rounded-full bg-cyan-500 text-black flex items-center justify-center'>J</div>
              <div className='ml-3'>
                <p className='text-md'>Jon Doe</p>
                <p className='text-sm text-muted-foreground'>185952a5d15a151axc18a1c1a5c</p>
              </div>
            </div>

            <SkeletonDemo />
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default AllParticipantsBar
