import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import UserBox from '@/components/user-box'
import { copyContent } from '@/lib/utils'
import { Copy } from 'lucide-react'

const TwoParticipnates = ({ allPrticipantesIds, screens }) => {
  return (
    <ResizablePanelGroup direction='horizontal' className='max-w-[95%] mx-auto my-5 min-h-[calc(100vh_-_200px)] rounded-lg border'>
      <ResizablePanel defaultSize={50} maxSize={77}>
        {allPrticipantesIds.length > 0 && <UserBox sessionId={allPrticipantesIds[0]} screens={screens} />}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50} maxSize={77}>
        {allPrticipantesIds.length > 1 ? (
          <UserBox sessionId={allPrticipantesIds[1]} screens={screens} />
        ) : (
          <div className='flex flex-col justify-center items-center h-full'>
            <div>Invite Other Participantes</div>

            <div className='text-sm flex items-center mt-3 cursor-pointer '>
              <span className='opacity-50'>{window.location.href} </span>
              <Copy
                className='ml-2 opacity-90 hover:opacity-100'
                size={18}
                cursor={'pointer'}
                onClick={() => {
                  copyContent(window.location.href)
                }}
              />
            </div>
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default TwoParticipnates
