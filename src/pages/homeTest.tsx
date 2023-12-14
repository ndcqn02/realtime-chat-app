import { useEffect, useState } from 'react'
import io from 'socket.io-client'
let socket: any

const HomeTest = () => {
  const [input, setInput] = useState('')

  const fakeMessage = {
    senderId: '00000020f51bb4362eee2a4d',
    recipientId: '507f191e810c19729de860ea',
    message: 'Tin nhan face nha',
  }

  useEffect(() => socketInitializer(), [])

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io('http://localhost:8000')

    socket.on('connect', () => {
      console.log('connected')
      socket.emit('sendMessage', fakeMessage)
    })

    socket.on('update-input', (msg: any) => {
      // handleNewMessage(data)
      // setInput(msg)

      // socket.emit('sendMessage', fakeMessage)
    })
  }

  const onChangeHandler = (e: any) => {
    e.preventDefault()
    console.log(e)
    setInput(e.target.value)
    socket.emit('sendMessage', e.target.value)
  }

  return (
    <div className="">
      <div>
        <ul id="messages"></ul>
      </div>

      <form onSubmit={onChangeHandler}>
        <input id="message" type="text" />
        <button>Submit</button>
      </form>
    </div>
  )
  // <input placeholder="Type something" value={input} onChange={onChangeHandler} />
}

export default HomeTest
