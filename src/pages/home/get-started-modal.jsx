// import { CopyIcon } from "@radix-ui/react-icons"

import api from '@/api/daily'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ROUTE_NAMES } from '@/utils/constants'
import { useDaily } from '@daily-co/daily-react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export function GetStartedModal() {
  const navigate = useNavigate()
  const dailyCallObj = useDaily()

  const { mutate: createRoomFn, isPending: isCreatingRoom } = useMutation({
    mutationKey: ['GET_STARTED'],
    mutationFn: () => api.createRoom(),
  })

  const { mutate: createTokenFn, isPending: isCreatingToken } = useMutation({
    mutationKey: ['CREATE_ROOM'],
    mutationFn: payload => api.createToken(payload),
  })

  const [userName, setUserName] = useState('')

  const handleJoinRoom = async options => {
    try {
      const roomName = options.roomName
      console.log('Options ==> ', options)
      delete options.roomName
      const d = await dailyCallObj.join(options)
      console.log('ddd ==> ', d)
      navigate(ROUTE_NAMES.ROOM.replace(':roomId', roomName))
    } catch (err) {
      const msg = err.message ?? err ?? 'Something went wrong'
      console.log('err ==> ', err)
      toast.error(msg)
    }
  }

  const handleCreateToken = roomDetails => {
    createTokenFn(
      {
        roomName: roomDetails.name,
        isOwner: true,
      },
      {
        onSuccess: data => {
          console.log('Token data ==> ', data)
          toast.success('Token has created successfully')
          navigate(ROUTE_NAMES.ROOM.replace(':roomId', roomDetails.name))
          localStorage.setItem('adminToken', data)
          handleJoinRoom({ token: data, url: roomDetails.url, userName, roomName: roomDetails.name })
        },
        onError: err => {
          const msg = err.message ?? err ?? 'Something went wrong'
          console.log('err ==> ', err)
          toast.error(msg)
        },
      }
    )
  }

  const handleOnStart = () => {
    createRoomFn(
      {},
      {
        onSuccess: data => {
          console.log('Room data ==> ', data)
          handleCreateToken(data)
          toast.success('Room has created successfully')
        },
        onError: err => {
          const msg = err.message ?? err ?? 'Something went wrong'
          console.log('err ==> ', err)
          toast.error(msg)
        },
      }
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <a href='#' class='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800'>
          Get started
          <svg class='w-5 h-5 ml-2 -mr-1' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path fill-rule='evenodd' d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z' clip-rule='evenodd'></path>
          </svg>
        </a>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
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

          {/* <Button type="submit" size="sm" className="px-3">
                        <span className="sr-only">Copy</span>
                        <CopyIcon className="h-4 w-4" />
                    </Button> */}
        </div>
        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button type='button' variant='default' className='w-full' onClick={handleOnStart} disabled={isCreatingRoom || isCreatingToken}>
              Start
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
