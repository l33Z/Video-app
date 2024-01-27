import { MinimalCallActionBtn } from '@/components/common-components'
import { Button } from '@/components/ui/button'
import { Copy, Info, Settings, Signal, SlidersHorizontal, UserRound, Users } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import ThemeModeToggle from '@/components/theme-mode-toggle'
import CameraConfigurationDrawer from '@/pages/room/camera-configuration-bar'
import { useState } from 'react'

const RoomNavbar = () => {
  const [isCameraSettingDrawerOpen, setIsCameraSettingDrawerOpen] = useState(false)

  return (
    <>
      <CameraConfigurationDrawer isOpen={isCameraSettingDrawerOpen} onOpenChange={setIsCameraSettingDrawerOpen} />

      <div className='w-full flex px-5 pt-2 items-center justify-between h-[60px]'>
        <div className='flex items-center '>
          <Popover>
            <PopoverTrigger>
              <Button onClick={() => {}} toolTipText={'Info'} variant='link' size='icon'>
                <Info size={18} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='pb-2 pt-1 px-0' align='start'>
              <div className=''>
                <div className='py-2 border-b px-4'>
                  <div className='text-sm flex items-center'>
                    Session ID: 204-764-024 <Copy className='ml-2' size={14} cursor={'pointer'} />{' '}
                  </div>
                </div>
                <div className='mt-2 px-4 ml-auto w-max flex items-center'>
                  <Signal size={16} className='mr-3' />
                  <div className='flex items-center'>
                    <span className='mr-1'>2</span>
                    <UserRound size={16} />{' '}
                  </div>
                </div>
                <div className='px-4 mt-3 pb-2 cursor-pointer flex items-center font-medium text-xs underline text-primary'>
                  {' '}
                  <Copy className='mr-2' size={12} /> Copy link to share
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className='flex items-center'>
          <MinimalCallActionBtn
            toolTipText={'Settings'}
            size='icon'
            className='ml-0 mx-3'
            onClick={() => {
              setIsCameraSettingDrawerOpen(true)
            }}
          >
            <SlidersHorizontal size={20} />
          </MinimalCallActionBtn>

          <ThemeModeToggle />
        </div>
      </div>
    </>
  )
}

export default RoomNavbar
