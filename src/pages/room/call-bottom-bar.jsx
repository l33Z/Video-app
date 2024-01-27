import { MinimalCallActionBtn } from '@/components/common-components'
import { Button } from '@/components/ui/button'
import { Camera, MessagesSquare, Mic, MicOff, PhoneOff, ScreenShare, ScreenShareOff, UsersRound, Video, VideoOff } from 'lucide-react'
import React, { useState } from 'react'
import AllParticipantsBar from '@/pages/room/all-participants-bar'

const CallBottomBar = () => {
  const [isAllPrticipantsDrawerOpen, setIsAllPrticipantsDrawerOpen] = useState(false)
  return (
    <>
      <AllParticipantsBar isOpen={isAllPrticipantsDrawerOpen} onOpenChange={setIsAllPrticipantsDrawerOpen} />

      <div className='w-full flex px-5 pb-2 items-center justify-between h-[60px]'>
        <div className='flex items-center'>
          <div className='flex flex-col items-center'>
            <MinimalCallActionBtn onClick={() => setIsAllPrticipantsDrawerOpen(!isAllPrticipantsDrawerOpen)} size='default' className='py-5 ml-0' toolTipText={'Users'} toolTipClassName='ml-0'>
              <UsersRound />
            </MinimalCallActionBtn>
          </div>
        </div>

        <div className='flex items-center'>
          <MinimalCallActionBtn toolTipText={'Mic'}>{true ? <Mic size={18} /> : <MicOff size={18} />}</MinimalCallActionBtn>

          <MinimalCallActionBtn toolTipText={'Video'}>{true ? <Video size={18} /> : <VideoOff size={18} />}</MinimalCallActionBtn>

          <MinimalCallActionBtn toolTipText={'ScreenShare'}>{true ? <ScreenShare size={18} /> : <ScreenShareOff size={18} />}</MinimalCallActionBtn>

          <MinimalCallActionBtn toolTipText={'Camera'}>
            <Camera size={18} />
          </MinimalCallActionBtn>

          <MinimalCallActionBtn variant='destructive' toolTipText={'PhoneOff'}>
            <PhoneOff size={18} />
          </MinimalCallActionBtn>
        </div>

        <div className='flex items-center'>
          <div className='flex flex-col items-center'>
            <MinimalCallActionBtn size='default' className='py-5 ml-0' toolTipText={'Messages'} toolTipClassName='ml-0'>
              <MessagesSquare />
            </MinimalCallActionBtn>
          </div>
        </div>
      </div>
    </>
  )
}

export default CallBottomBar
