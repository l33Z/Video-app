import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Mic, MicOff, MinusCircle, MoreVertical, ScreenShareOff, UsersRound, Video, VideoOff } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useDaily, useLocalParticipant, useParticipant } from '@daily-co/daily-react'
import { colorArray } from '@/utils/constants'
import { useMemo, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import useClickOutside from '@/hooks/useClickOutside'

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

const ParticipanteBox = ({ participant, isAdmin, actionDropdownRef, handleActionsClick, selectedParticipanteId, setSelectedParticipanteId }) => {
  console.log('participant ==> ', participant)

  const getColor = useMemo(() => {
    const index = Math.floor(Math.random() * colorArray.length)
    return colorArray[index]
  }, [])

  return (
    <div className='border rounded-md py-3 pl-5 flex items-center mt-3'>
      <div className='w-8 h-8 rounded-full flex items-center justify-center text-primary-foreground' style={{ background: getColor }}>
        {participant.user_name.charAt(0).toUpperCase()}
      </div>
      <div className='ml-3'>
        <p className='text-md'>
          {participant.user_name} {participant.local && <span className='text-muted-foreground'> (You)</span>}
        </p>
        <p className='text-muted-foreground text-xs'>{participant.session_id}</p>
      </div>
      {isAdmin && !participant.local && (
        <Popover open={selectedParticipanteId === participant.session_id}>
          <PopoverTrigger>
            <Button className='ml-2' size='icon' variant='link' onClick={() => setSelectedParticipanteId(participant.session_id)}>
              <MoreVertical size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='p-0 w-[175px] m-0' align='start'>
            <div className=' rounded-md overflow-hidden' ref={actionDropdownRef}>
              <div className='flex px-5 py-2 items-center border-b hover:bg-secondary cursor-pointer overflow-hidden' onClick={() => handleActionsClick('AUDIO', participant)}>
                {participant.audio ? <Mic size={16} /> : <MicOff size={16} />}
                <p className='ml-4 text-xs'>{!participant.audio ? 'Mute' : 'Unmute'}</p>
              </div>

              <div className='flex px-5 py-2 items-center border-b hover:bg-secondary cursor-pointer overflow-hidden' onClick={() => handleActionsClick('VIDEO', participant)}>
                {!participant.video ? <Video size={16} /> : <VideoOff size={16} />}
                <p className='ml-4 text-xs'>{!participant.video ? 'Start Video' : 'Stop Video'}</p>
              </div>

              {participant.screen && (
                <div className='flex px-5 py-2 items-center border-b hover:bg-secondary cursor-pointer overflow-hidden' onClick={() => handleActionsClick('STOP_SCREEN_SHARE', participant)}>
                  <ScreenShareOff size={16} />
                  <p className='ml-4 text-xs'>Stop Screenshare</p>
                </div>
              )}

              <div className='flex px-5 py-2 items-center  hover:bg-destructive cursor-pointer overflow-hidden' onClick={() => handleActionsClick('REMOVE', participant)}>
                {<MinusCircle size={16} />}
                <p className='ml-4 text-xs'>Remove</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

const AllParticipantsBar = ({ isOpen, onOpenChange }) => {
  const dailyCallObj = useDaily()
  const allParticipantes = dailyCallObj.participants()
  const localParticipantData = useLocalParticipant()
  const [selectedParticipanteId, setSelectedParticipanteId] = useState(false)

  const actionDropdownRef = useClickOutside(() => setSelectedParticipanteId(''))

  const handleActionsClick = (type, pd) => {
    setSelectedParticipanteId('')

    if (type === 'AUDIO') {
      dailyCallObj.updateParticipant(pd.session_id, {
        setAudio: !pd.audio,
      })
    } else if (type === 'VIDEO') {
      dailyCallObj.updateParticipant(pd.session_id, {
        setVideo: !pd.video,
      })
    } else if (type === 'STOP_SCREEN_SHARE') {
      dailyCallObj.updateParticipant(pd.session_id, {
        setScreenShare: false,
      })
    } else if (type === 'REMOVE') {
      dailyCallObj.updateParticipant(pd.session_id, {
        eject: true,
      })
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger />
      <SheetContent side={'left'}>
        <SheetHeader>
          <SheetTitle>Participants</SheetTitle>
          <div className=''>
            {Object.keys(allParticipantes).map(id => {
              return <ParticipanteBox actionDropdownRef={actionDropdownRef} participant={allParticipantes[id]} key={id} handleActionsClick={handleActionsClick} isAdmin={localParticipantData.permissions.canAdmin} selectedParticipanteId={selectedParticipanteId} setSelectedParticipanteId={setSelectedParticipanteId} />
            })}
            {/* <div className='border rounded-md py-3 px-5 flex items-center mt-3'>
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
            </div> */}

            {/* <SkeletonDemo /> */}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default AllParticipantsBar
