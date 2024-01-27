const createRoom = async props => {
  const expiry = Math.round(Date.now() / 1000) + 60 * 60

  try {
    const roomRes = await fetch('https://api.daily.co/v1/rooms/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_DAILY_API_KEY}`,
      },
      body: JSON.stringify({
        properties: {
          exp: expiry,
          ...props,
        },
      }),
    })

    const room = await roomRes.json()
    if (roomRes.status !== 200) {
      throw new Error(room.error)
    }
    return room
  } catch (e) {
    throw new Error(e)
  }
}

const createToken = async ({ isOwner, roomName }) => {
  const expiry = Math.round(Date.now() / 1000) + 60 * 60

  const tokenRes = await fetch('https://api.daily.co/v1/meeting-tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_DAILY_API_KEY}`,
    },
    body: JSON.stringify({
      properties: { room_name: roomName, exp: expiry, is_owner: isOwner },
    }),
  })

  const tokenData = await tokenRes.json()

  if (tokenRes.status !== 200) {
    throw new Error(tokenData.error)
  }
  return tokenData.token
}

const api = {
  createToken,
  createRoom,
}

export default api
