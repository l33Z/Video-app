import React, { useEffect, useState, useCallback } from 'react'
import CallBottomBar from '@/pages/room/call-bottom-bar'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { DailyVideo, useDaily, useLocalParticipant, useLocalSessionId, useParticipant } from '@daily-co/daily-react'
import { ROUTE_NAMES } from '@/utils/constants'
import RoomNavbar from '@/pages/room/room-navbar'

const Room = () => {
  const dailyCallObj = useDaily()
  const localParticipant = useLocalParticipant()
  console.log('localParticipant ==> ', localParticipant)
  const [participantsList, setParticipantsList] = useState({})

  const allParty = dailyCallObj.participants()
  console.log('allParty ==> ', allParty)

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

  useEffect(() => {}, [])

  // const handleJoinedMeeting = (e) => {
  //     console.log('handleJoinedMeeting ===> ', e);
  //     console.log(e.action);
  //     setParticipantsList((p) => ({
  //         ...p,
  //         [e.participants.local.session_id]: e.participants.local,
  //     }));
  // };

  // const handleParticipantJoined = (e) => {
  //     console.log('handleParticipantJoined ===> ', e);
  //     console.log(e.action);
  //     setParticipantsList((p) => ({
  //         ...p,
  //         [e.participant.session_id]: e.participant,
  //     }));
  // };

  // const handleParticipantUpdate = (e) => {
  //     console.log('handleParticipantUpdate ===> ', e);

  //     console.log(e.action);
  //     // Return early if the participant list isn't set yet.
  //     // This event is sometimes emitted before the joined-meeting event.
  //     const { participant } = e;
  //     const id = participant.session_id;
  //     if (!participantsList[id]) return;
  //     // Only update the participants list if the permission has changed.
  //     // Daily Prebuilt handles all other call changes for us.
  //     if (
  //         participantsList[id].permissions.canAdmin !==
  //         participant.permissions.canAdmin
  //     ) {
  //         setParticipantsList((p) => ({
  //             ...p,
  //             [id]: participant,
  //         }));
  //         if (participant.local) {
  //             setIsAdmin(participant.permissions.canAdmin);
  //         }
  //     }
  // };

  // const handleParticipantLeft = (e) => {
  //     console.log('handleParticipantLeft ===> ', e);

  //     console.log(e.action);
  //     setParticipantsList((p) => {
  //         const currentParticipants = { ...p };
  //         delete currentParticipants[e.participant.session_id];
  //         return currentParticipants;
  //     });
  // };

  // const handleLeftMeeting = useCallback(
  //     (e) => {
  //         console.log(e.action);

  //         if (dailyCallObj) {
  //             removeDailyEvents()
  //         }

  //         // Reset state
  //         // setCallFrame(null);
  //         // setIsAdmin(false);
  //         // setSubmitting(false);
  //         setParticipantsList({});
  //     },
  //     [dailyCallObj]
  // );

  // const handleError = (e) => {
  //     console.log(e.action);
  //     setError(e.errorMsg);
  // };

  // const addDailyEvents = () => {
  //     dailyCallObj
  //         .on('joined-meeting', handleJoinedMeeting)
  //         .on('participant-joined', handleParticipantJoined)
  //         .on('participant-updated', handleParticipantUpdate)
  //         .on('participant-left', handleParticipantLeft)
  //         .on('left-meeting', handleLeftMeeting)
  //         .on('error', handleError);
  // };

  // const removeDailyEvents = () => {
  //     dailyCallObj
  //         .off('joined-meeting', handleJoinedMeeting)
  //         .off('participant-joined', handleParticipantJoined)
  //         .off('participant-updated', handleParticipantUpdate)
  //         .off('participant-left', handleParticipantLeft)
  //         .off('error', handleError);
  // };

  // useEffect(() => {
  //     addDailyEvents()
  // }, [])

  return (
    <div className='flex flex-col justify-center items-center'>
      <RoomNavbar />
      <div className='w-full min-h-[calc(100vh_-_120px)] flex flex-1'>
        <ResizablePanelGroup direction='horizontal' className='max-w-[95%] mx-auto my-5 min-h-[calc(100vh_-_200px)] rounded-lg border'>
          <ResizablePanel defaultSize={50} maxSize={77}>
            <DailyVideo sessionId={localParticipant?.session_id} style={{ width: '100%', height: '100%' }} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} maxSize={77}>
            <div className='flex h-full items-center justify-center p-6'>b</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <CallBottomBar />
    </div>
  )
}

export default Room
