import api from '@/api/daily'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { commonErrorCatch } from '@/lib/utils'
import { MEETING_STATES } from '@/utils/constants'
import { useDaily } from '@daily-co/daily-react'
import { useMutation } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

export function GetStartedModal({ setMeetingState }) {
  const params = useParams()
  const dailyCallObj = useDaily()

  const { mutate: createTokenFn, isPending: isCreatingToken } = useMutation({
    mutationKey: ['CREATE_ROOM'],
    mutationFn: payload => api.createToken(payload),
  })

  const [userName, setUserName] = useState('')

  const handleCreateToken = () => {
    const roomName = params.roomId
    createTokenFn(
      {
        roomName,
        isOwner: localStorage.getItem('isOwner') ?? false,
      },
      {
        onSuccess: data => {
          console.log('Token data ==> ', data)
          toast.success('Token has created successfully')
          localStorage.setItem('adminToken', data)
          setMeetingState(MEETING_STATES.STARTED)
          const url = import.meta.env.VITE_DAILY_DOMAIN_URL + roomName
          handleJoinRoom({ token: data, url, userName })
        },
        onError: err => {
          setMeetingState(MEETING_STATES.ERROR)
          commonErrorCatch(err)
        },
      }
    )
  }

  const handleJoinRoom = async options => {
    try {
      console.log('Options ==> ', options)
      const d = await dailyCallObj.join(options)
      console.log('ddd ==> ', d)
    } catch (err) {
      setMeetingState(MEETING_STATES.ERROR)
      commonErrorCatch(err)
    }
  }

  return (
    <>
      <Dialog open={true}>
        <DialogTrigger />
        <DialogContent className='w-[800px]'>
          <DialogHeader>
            <DialogTitle>Get Started</DialogTitle>
            <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
          </DialogHeader>
          <div className='flex items-center flex-col w-full  my-3'>
            <div className='grid flex-1 gap-2 w-full mb-4'>
              <Label htmlFor='username'>Username</Label>
              <Input placeholder={'John Doe'} id='username' value={userName} onChange={e => setUserName(e.target.value)} />
            </div>

            <div>
              <Label htmlFor='zzz'>Preferences</Label>
              <DialogDescription className='ml-0 pl-0'>Enable automatic audio and video upon joining? Use the switch below to customize your preferences.</DialogDescription>

              <div className='flex mt-5 w-full'>
                <div className='flex items-center mr-7'>
                  <Switch id='videoSwith' className='mr-3' />
                  <Label htmlFor='videoSwith'>Video</Label>
                </div>
                <div className='flex items-center'>
                  <Switch id='audioSwitch' className='mr-3' />
                  <Label htmlFor='audioSwitch'>Audio</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className='sm:justify-start'>
            <DialogClose asChild>
              <Button disabled={isEmpty(userName) || isCreatingToken} type='button' variant='default' className='w-full' onClick={handleCreateToken}>
                Start
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
