import { DailyVideo, useParticipant } from '@daily-co/daily-react'
import React, { useMemo, useState } from 'react'
import { Button } from './ui/button'
import { Fullscreen } from 'lucide-react'
import { capitalize } from 'lodash'
import userLogo from '/user.png'
import { colorArray } from '@/utils/constants'
import { cn } from '@/lib/utils'

const UserBox = ({ sessionId, isForScreenSharing, screens = [] }) => {
  const inVerse = screens.length !== 0 && !isForScreenSharing
  const [isCoveredVideo, setIsCoveredVideo] = useState(inVerse)
  const user = useParticipant(sessionId)
  console.log('user ==> ', user)

  const getColor = useMemo(() => {
    const index = Math.floor(Math.random() * colorArray.length)
    return colorArray[index]
  }, [])

  const RenderUserPhoto = () => {
    const isUserSharingScreen = user.screen
    return (
      <>
        {user.user_name ? (
          <div className={cn('w-[220px] flex items-center justify-center h-[220px] rounded-full aspect-square', screens.length > 0 && 'w-[120px] h-[120px]')} style={{ background: getColor }}>
            <h1 className={cn('text-8xl', screens.length > 0 && 'text-4xl')}>{user.user_name.charAt(0).toUpperCase()}</h1>
          </div>
        ) : (
          <div className='w-[70%] flex items-center justify-center h-[70%] rounded-full aspect-square'>
            <img src={userLogo} alt='user' />
          </div>
        )}
      </>
    )
  }

  return (
    <div className='w-full h-full'>
      <div className={cn('w-full h-[90%] flex items-center justify-center', inVerse && 'h-[80%]')}>
        {user.video || (user.screen && isForScreenSharing) ? <DailyVideo type={isForScreenSharing ? 'screenVideo' : 'video'} sessionId={sessionId} style={{ width: '100%', height: '100%' }} fit={isCoveredVideo ? 'cover' : 'contain'} /> : <RenderUserPhoto />}
      </div>
      <div className={cn('flex px-5 py-2 items-center justify-between h-[10%]', inVerse && 'h-[20%]')}>
        <div>
          <p className='text-sm'>
            {' '}
            {capitalize(user.user_name || 'Member')}
            {user.local && ' (you)'}
          </p>
          <p className='text-xs text-secondary-foreground'>{sessionId}</p>
        </div>
        {(screens.length === 0 || isForScreenSharing) && (
          <Button
            size='icon'
            variant='link'
            onClick={() => {
              setIsCoveredVideo(!isCoveredVideo)
            }}
          >
            <Fullscreen />
          </Button>
        )}
      </div>
    </div>
  )
}

export default UserBox
