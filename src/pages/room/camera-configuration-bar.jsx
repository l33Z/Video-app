import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { MinimalSelection } from '@/components/common-components'

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

const CameraConfigurationDrawer = ({ isOpen, onOpenChange }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger />
      <SheetContent side={'right'}>
        <SheetHeader>
          <SheetTitle>Call Settings</SheetTitle>
          <div className=''>
            <MinimalSelection title={'Camera'} />
            <MinimalSelection title={'Microphone'} />
            <MinimalSelection title={'Speakers'} />
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default CameraConfigurationDrawer
