import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { MinimalSelection } from '@/components/common-components'
import { DailyVideo, useDevices, useLocalSessionId } from '@daily-co/daily-react'
import { PlayCircle } from 'lucide-react'

const CameraConfigurationDrawer = ({ isOpen, onOpenChange }) => {
  const { cameras, microphones, speakers, currentCam, currentMic, currentSpeaker, setCamera, setMicrophone, setSpeaker } = useDevices()

  const playSound = () => {
    const audio = new Audio('/notification.mp3')
    audio.play()
  }

  const localUserId = useLocalSessionId()

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger />
      <SheetContent side={'right'}>
        <SheetHeader>
          <SheetTitle>Call Settings</SheetTitle>
          <div className=''>
            <div className='border p-1 w-max mx-auto mt-5 rounded-md'>
              <div className='w-[250px] h-[150px] rounded-md   overflow-hidden'>
                <DailyVideo sessionId={localUserId} fit='cover' style={{ width: '100%', height: '100%' }} />
              </div>
            </div>

            <MinimalSelection title={'Camera'} options={cameras} value={currentCam?.device?.deviceId} onValueChange={setCamera} />
            <MinimalSelection title={'Microphone'} options={microphones} value={currentMic?.device?.deviceId} onValueChange={setMicrophone} />
            <MinimalSelection title={'Speakers'} options={speakers} value={currentSpeaker?.device?.deviceId} onValueChange={setSpeaker} />

            <div className='mt-5 flex items-center cursor-pointer opacity-80' onClick={playSound}>
              <PlayCircle size={18} />
              <div className='ml-2 text-sm hover:underline'>Plat Test Sound</div>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default CameraConfigurationDrawer
