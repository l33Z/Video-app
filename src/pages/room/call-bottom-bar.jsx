import { MinimalCallActionBtn } from '@/components/common-components'
import { Button } from '@/components/ui/button'
import { Camera, MessagesSquare, Mic, MicOff, PhoneOff, ScreenShare, ScreenShareOff, UsersRound, Video, VideoOff } from 'lucide-react'
import React, { useState } from 'react'
import AllParticipantsBar from '@/pages/room/all-participants-bar'
import { useAudioTrack, useDaily, useLocalParticipant, useScreenShare, useVideoTrack } from '@daily-co/daily-react'
import { useNavigate } from 'react-router-dom'
import { ROUTE_NAMES } from '@/utils/constants'
import { takeScreenShot } from '@/lib/utils'

const CallBottomBar = () => {
  const dailyCallObj = useDaily()
  const navigate = useNavigate()
  const [isAllPrticipantsDrawerOpen, setIsAllPrticipantsDrawerOpen] = useState(false)

  const localUser = useLocalParticipant()

  console.log('localUser ==> ', localUser)

  const userVideoStates = useVideoTrack(localUser.session_id)
  const userAudioStates = useAudioTrack(localUser.session_id)
  const { isSharingScreen, screens, startScreenShare, stopScreenShare } = useScreenShare()

  console.log('userVideoStates ==> ', userVideoStates)
  console.log('screens ==> ', screens)

  const handleAudioToggle = () => {
    dailyCallObj.setLocalAudio(userAudioStates.isOff)
  }

  const handleVideoToggle = () => {
    dailyCallObj.setLocalVideo(userVideoStates.isOff)
  }

  const handleTakeScreenShot = () => {
    takeScreenShot()
  }

  const handleScreenShareToggle = () => {
    if (isSharingScreen) {
      stopScreenShare()
    } else {
      startScreenShare()
    }
  }

  const handleLeaveCall = () => {
    dailyCallObj.destroy()
    navigate(ROUTE_NAMES.HOME)
  }
  return (
    <>
      <AllParticipantsBar isOpen={isAllPrticipantsDrawerOpen} onOpenChange={setIsAllPrticipantsDrawerOpen} />

      <div className='w-full flex px-5 pb-2 items-center justify-between h-[60px]'>
        <div className='flex items-center'>
          <div className='flex flex-col items-center'>
            <MinimalCallActionBtn onClick={() => setIsAllPrticipantsDrawerOpen(!isAllPrticipantsDrawerOpen)} size='default' className='py-5 ml-0' tooltiptext={'Users'} tooltipclass='ml-0'>
              <UsersRound />
            </MinimalCallActionBtn>
          </div>
        </div>

        <div className='flex items-center'>
          <MinimalCallActionBtn onClick={handleAudioToggle} tooltiptext={userAudioStates.isOff ? 'UnMute' : 'Mute'}>
            {!userAudioStates.isOff ? <Mic size={18} /> : <MicOff size={18} />}
          </MinimalCallActionBtn>

          <MinimalCallActionBtn onClick={handleVideoToggle} tooltiptext={userVideoStates.isOff ? 'Video' : 'Stop Video'}>
            {!userVideoStates.isOff ? <Video size={18} /> : <VideoOff size={18} />}
          </MinimalCallActionBtn>

          <MinimalCallActionBtn onClick={handleScreenShareToggle} tooltiptext={isSharingScreen ? 'Stop Screenshare' : 'Screenshare'}>
            {!isSharingScreen ? <ScreenShare size={18} /> : <ScreenShareOff size={18} />}
          </MinimalCallActionBtn>

          <MinimalCallActionBtn tooltiptext={'Take Screenshot'} onClick={handleTakeScreenShot}>
            <Camera size={18} />
          </MinimalCallActionBtn>

          <MinimalCallActionBtn variant='destructive' tooltiptext={'End Call'} onClick={handleLeaveCall}>
            <PhoneOff size={18} />
          </MinimalCallActionBtn>
        </div>

        <div className='flex items-center'>
          <div className='flex flex-col items-center'>
            <MinimalCallActionBtn size='default' className='py-5 ml-0' tooltiptext={'Messages'} tooltipclass='ml-0'>
              <MessagesSquare />
            </MinimalCallActionBtn>
          </div>
        </div>
      </div>
    </>
  )
}

export default CallBottomBar
