import Daily from '@daily-co/daily-js'
import { DailyProvider } from '@daily-co/daily-react'
import { useMemo, useState } from 'react'

const DailyCallProvider = ({ children }) => {
  const [co] = useState(() => Daily.createCallObject())

  return <DailyProvider callObject={co}>{children}</DailyProvider>
}

export default DailyCallProvider
