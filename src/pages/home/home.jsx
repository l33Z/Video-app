import api from '@/api/daily'
import Navbar from '@/components/navbar'
import { commonErrorCatch } from '@/lib/utils'
import { ROUTE_NAMES } from '@/utils/constants'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Home = () => {
  const navigate = useNavigate()

  const { mutate: createRoomFn, isPending: isCreatingRoom } = useMutation({
    mutationKey: ['GET_STARTED'],
    mutationFn: () => api.createRoom(),
  })

  const handleGetStarted = () => {
    createRoomFn(
      {},
      {
        onSuccess: data => {
          console.log('Room data ==> ', data)
          localStorage.setItem('isOwner', true)
          navigate(ROUTE_NAMES.ROOM.replace(':roomId', data.name))
          toast.success('Room has created successfully')
        },
        onError: err => {
          commonErrorCatch(err)
        },
      }
    )
  }

  return (
    <>
      <Navbar />
      <div>
        {/* <section class=''>
          <div class='grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'>
            <div class='mr-auto place-self-center lg:col-span-7'>
              <h1 class='max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white'>Click Connect Communicate</h1>
              <p class='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400'>Seamless video calls, instant connections bringing people together effortlessly, anytime, anywhere. Join the conversation today!</p>
              <button disabled={isCreatingRoom} onClick={handleGetStarted} className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800'>
                {isCreatingRoom && <Loader2 size={20} className='animate-spin mr-3' />}   Get started
                {!isCreatingRoom && <svg class='w-5 h-5 ml-2 -mr-1' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                  <path fill-rule='evenodd' d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z' clip-rule='evenodd'></path>
                </svg>}
              </button>
            </div>
            <div class='hidden lg:mt-0 lg:col-span-5 lg:flex'>
              <img src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png' alt='mockup' />
            </div>
          </div>
        </section> */}
        <section className='relative'>
          {/* Illustration behind hero content */}
          {/* <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none" aria-hidden="true">
            <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
                  <stop stopColor="#FFF" offset="0%" />
                  <stop stopColor="#EAEAEA" offset="77.402%" />
                  <stop stopColor="#DFDFDF" offset="100%" />
                </linearGradient>
              </defs>
              <g fill="url(#illustration-01)" fillRule="evenodd">
                <circle cx="1232" cy="128" r="128" />
                <circle cx="155" cy="443" r="64" />
              </g>
            </svg>
          </div> */}

          <div className='max-w-7xl mx-auto px-4 sm:px-6'>
            {/* Hero content */}
            <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
              {/* Section header */}
              <div className='text-center pb-12 md:pb-16'>
                <h1 className='text-8xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-8' data-aos='zoom-y-out'>
                  Click Connect <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400'>Communicate</span>
                </h1>
                <div className='max-w-3xl mx-auto'>
                  <p className='text-2xl text-gray-600 mb-8' data-aos='zoom-y-out' data-aos-delay='150'>
                    Seamless video calls, instant connections bringing people together effortlessly, anytime, anywhere. Join the conversation today!
                  </p>
                  <div className='max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center' data-aos='zoom-y-out' data-aos-delay='300'>
                    <div>
                      <button
                        disabled={isCreatingRoom}
                        onClick={handleGetStarted}
                        className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
                      >
                        {isCreatingRoom && <Loader2 size={20} className='animate-spin mr-3' />} Get started
                        {!isCreatingRoom && (
                          <svg class='w-5 h-5 ml-2 -mr-1' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                            <path fill-rule='evenodd' d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z' clip-rule='evenodd'></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
