import { useQuery } from 'react-apollo'
import { useEffect, useState } from 'react'
import sessionQuery from 'vtex.store-resources/QuerySession'

const useSession = (): Session | undefined => {
  const [session, setSession] = useState<Session | undefined>()

  const { data, loading } = useQuery(sessionQuery, { ssr: false })

  useEffect(() => {
    if (loading || !data) return

    if (!loading) {
      setSession(data)
    }
  }, [loading, data])

  return session
}

export default useSession
