import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '@/pages/home/home'
import Navbar from '@/components/navbar'
import { Toaster } from '@/components/ui/sonner'
import { ROUTE_NAMES } from '@/utils/constants'
import Room from '@/pages/room/room'

export default function App() {
  return (
    <>
      <Toaster position='top-right' richColors={true} />
      <Router>
        <Routes>
          <Route exact path={ROUTE_NAMES.HOME} element={<Home />} />
          <Route exact path={ROUTE_NAMES.ROOM} element={<Room />} />
        </Routes>
      </Router>
    </>
  )
}
