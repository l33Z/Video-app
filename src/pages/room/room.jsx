import React, { useEffect, useState, useMemo } from 'react'
import CallBottomBar from '@/pages/room/call-bottom-bar'
import { useDaily, useLocalParticipant, useParticipantIds, useScreenShare } from '@daily-co/daily-react'
import { MEETING_STATES } from '@/utils/constants'
import RoomNavbar from '@/pages/room/room-navbar'
import { useParams } from 'react-router-dom'
import { GetStartedModal } from '../home/get-started-modal'
import { RoomErrorComp } from './room-common-error'
import TwoParticipnates from '@/pages/room/screen-layoutes/two-users'
import TwoParticipnatesScreenShare from '@/pages/room/screen-layoutes/two-users-screen-share'
import Loading from '@/components/loading'

const Room = () => {
  const params = useParams()

  const [meetingState, setMeetingState] = useState(MEETING_STATES.INTIAL)

  console.log('params ==> ', params)

  const dailyCallObj = useDaily()
  const localParticipant = useLocalParticipant()
  console.log('localParticipant ==> ', localParticipant)

  const [participantsList, setParticipantsList] = useState({})

  const allParty = dailyCallObj.participants()
  console.log('allParty ==> ', allParty)

  const allPrticipantesIds = useParticipantIds()

  useEffect(() => {
    let newParticipantes = []

    console.log('erererrerer')

    Object.keys(allParty).forEach(key => {
      console.log('zzzz key ==> ', key)
      console.log('zzzz allParty[key] ==> ', allParty[key])

      newParticipantes.push(allParty[key])
    })

    setParticipantsList(newParticipantes)
  }, [dailyCallObj, allParty])

  const newPartyList = useMemo(() => {
    let newParticipantes = []

    console.log('erererrererzzzz')

    Object.keys(allParty).forEach(key => {
      console.log('zzzz key zzz==> ', key)
      console.log('zzzz allParty[key] zzz==> ', allParty[key])

      newParticipantes.push(allParty[key])
    })

    return newParticipantes
  }, [dailyCallObj, allParty])

  console.log('newPartyList ===> ', newPartyList)

  useEffect(() => {
    if (params.roomId) {
      setMeetingState(MEETING_STATES.INTIAL)
    }
  }, [])

  const remoteKeys = useMemo(() => {
    console.log('Keys ==> ', Object.keys(allParty))
    return Object.keys(allParty).filter(key => key !== 'local')
  }, [allParty])

  console.log('remoteKeys ==> ', remoteKeys)

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

  console.warn('participantsList ==> ', participantsList)
  console.warn('allPrticipantesIds ==> ', allPrticipantesIds)

  const { screens } = useScreenShare()

  console.warn('screens ==> ', screens)

  return (
    <div className='flex flex-col justify-center items-center'>
      {meetingState === MEETING_STATES.INTIAL && <GetStartedModal setMeetingState={setMeetingState} />}

      {meetingState === MEETING_STATES.STARTED && allPrticipantesIds.length === 0 && <Loading />}

      {meetingState === MEETING_STATES.STARTED && allPrticipantesIds.length !== 0 && (
        <>
          <RoomNavbar />
          <div className='w-full min-h-[calc(100vh_-_120px)] flex flex-1'>{screens.length === 0 ? <TwoParticipnates allPrticipantesIds={allPrticipantesIds} screens={screens} /> : <TwoParticipnatesScreenShare allPrticipantesIds={allPrticipantesIds} screens={screens} />}</div>
          <CallBottomBar />
        </>
      )}

      {meetingState === MEETING_STATES.ERROR && <RoomErrorComp />}
    </div>
  )
}

export default Room
